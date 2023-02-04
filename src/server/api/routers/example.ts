import { Prisma } from "@prisma/client";
import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { RECIPE_SCHEMA } from "components/RecipeForm/constants";

const isPublishedClause = (userId: string | undefined) => ({
  OR: [{ isPublished: true }, ...(userId ? [{ authorId: userId }] : [])],
});

export const exampleRouter = createTRPCRouter({
  findRecipes: publicProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user.id;

    return ctx.prisma.recipe.findMany({
      where: isPublishedClause(userId),
      orderBy: { createdAt: "desc" },
      ...completeRecipeInclude,
    });
  }),

  findRecipesByAuthorId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.recipe.findMany({
        where: { authorId: id },
        ...completeRecipeInclude,
        orderBy: { createdAt: "desc" },
      });
    }),

  findRecipe: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.recipe.findUnique({
        where: { id },
        ...completeRecipeInclude,
      });
    }),

  findFavoriteRecipesByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.userFavorites.findMany({
        where: { userId: id },
        include: {
          recipe: {
            ...completeRecipeInclude,
          },
        },
      });
    }),

  createRecipe: protectedProcedure
    .input(RECIPE_SCHEMA)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.recipe.create({
        data: {
          ...input,
          authorId: userId,
          directions: {
            createMany: {
              data: input.directions,
            },
          },
          ingredients: {
            createMany: {
              data: input.ingredients,
            },
          },
        },
        ...completeRecipeInclude,
      });
    }),

  updateRecipe: protectedProcedure
    .input(RECIPE_SCHEMA.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: recipeId } = input;
      const userId = ctx.session.user.id;
      const recipe = await ctx.prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (userId !== recipe?.authorId) {
        throw new Error("Unauthorized");
      }

      const [, , updatedRecipe] = await ctx.prisma.$transaction([
        ctx.prisma.ingredient.deleteMany({
          where: { recipeId },
        }),
        ctx.prisma.direction.deleteMany({
          where: { recipeId },
        }),
        ctx.prisma.recipe.update({
          where: { id: recipeId },
          data: {
            ...input,
            authorId: userId,
            directions: {
              createMany: {
                data: input.directions,
              },
            },
            ingredients: {
              createMany: {
                data: input.ingredients,
              },
            },
          },
          ...completeRecipeInclude,
        }),
      ]);

      return updatedRecipe;
    }),

  updatePublished: protectedProcedure
    .input(z.object({ id: z.string(), isPublished: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, isPublished } = input;
      const userId = ctx.session.user.id;
      const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });
      if (userId !== recipe?.authorId) {
        throw new Error("Unauthorized");
      }

      return ctx.prisma.recipe.update({
        where: { id },
        data: { isPublished },
        ...completeRecipeInclude,
      });
    }),

  deleteRecipe: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const userId = ctx.session.user.id;
      const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });
      if (userId !== recipe?.authorId) {
        throw new Error("Unauthorized");
      }

      return ctx.prisma.recipe.delete({
        where: {
          id,
        },
      });
    }),

  createUserFavorite: protectedProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(({ ctx, input: { recipeId } }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.userFavorites.create({
        data: {
          userId,
          recipeId,
        },
      });
    }),

  deleteUserFavorite: protectedProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(({ ctx, input: { recipeId } }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.userFavorites.delete({
        where: {
          userId_recipeId: {
            userId,
            recipeId,
          },
        },
      });
    }),

  importRecipe: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input: { url } }) => {
      return (await axios.get<string>(url)).data;
    }),

  findAppUser: protectedProcedure.query(({ ctx }) => {
    const { id } = ctx.session.user;
    return ctx.prisma.appUser.findUnique({ where: { id } });
  }),

  updateAppUser: protectedProcedure
    .input(z.object({ displayName: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { displayName } = input;
      return ctx.prisma.appUser.update({
        where: { id },
        data: { displayName },
      });
    }),
});

// Get type of recipe with includes added
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const completeRecipeInclude = {
  include: {
    author: true,
    directions: true,
    ingredients: true,
  },
};

const completeRecipe = Prisma.validator<Prisma.recipeArgs>()(
  completeRecipeInclude
);
export type CompleteRecipe = Prisma.recipeGetPayload<typeof completeRecipe>;
