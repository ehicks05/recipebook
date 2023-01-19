import { Prisma } from "@prisma/client";
import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  findRecipes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
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