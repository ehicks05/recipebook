import { Prisma } from "@prisma/client";
import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { RECIPE_SCHEMA } from "components/RecipeForm/constants";

export const exampleRouter = createTRPCRouter({
  findRecipes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      ...completeRecipeInclude,
      orderBy: { createdAt: "desc" },
    });
  }),

  findRecipesByAuthorId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.recipe.findMany({
        where: { authorId: { equals: id } },
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
        where: { userId: { equals: id } },
        include: {
          recipe: {
            ...completeRecipeInclude,
          },
        },
      });
    }),

  createRecipe: publicProcedure
    .input(RECIPE_SCHEMA)
    .mutation(async ({ ctx, input }) => {
      // TODO: Auth
      const appUser = await ctx.prisma.appUser.findUnique({
        where: { displayName: "John Cooks" },
      });
      if (!appUser) throw new Error("appUser not found");
      return ctx.prisma.recipe.create({
        data: {
          ...input,
          authorId: appUser.id,
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

  createUserFavorite: publicProcedure
    .input(z.object({ userId: z.string(), recipeId: z.string() }))
    .mutation(({ ctx, input: { userId, recipeId } }) => {
      return ctx.prisma.userFavorites.create({
        data: {
          userId,
          recipeId,
        },
      });
    }),

  deleteUserFavorite: publicProcedure
    .input(z.object({ userId: z.string(), recipeId: z.string() }))
    .mutation(({ ctx, input: { userId, recipeId } }) => {
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

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
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
