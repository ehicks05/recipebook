import { z } from 'zod';

import { db } from 'server/db-api';
import { RecipeSchema, RecipeUpdateSchema } from 'server/schema';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
	allRecipes: publicProcedure.query(({ ctx }) => {
		return db.recipes.recipes(ctx.auth.userId);
	}),

	findRecipes: publicProcedure
		.input(z.object({ terms: z.array(z.string()) }))
		.query(({ ctx, input }) => {
			return db.recipes.findRecipes(ctx.auth.userId, input.terms);
		}),

	findRecipe: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input: { id } }) => {
			return db.recipes.recipeById(id);
		}),

	myRecipes: protectedProcedure.query(async ({ ctx }) => {
		return db.recipes.recipesByAuthor(ctx.auth.userId);
	}),

	createRecipe: protectedProcedure
		.input(RecipeSchema)
		.mutation(async ({ ctx, input }) => {
			return db.recipes.createRecipe(ctx.auth.userId, input);
		}),

	updateRecipe: protectedProcedure
		.input(RecipeUpdateSchema)
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { id } = input;

			const recipe = await db.recipes.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			const [, , updatedRecipe] = await db.recipes.updateRecipeNested(
				id,
				userId,
				input,
			);

			return updatedRecipe;
		}),

	updatePublished: protectedProcedure
		.input(z.object({ id: z.string(), isPublished: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { id, isPublished } = input;

			const recipe = await db.recipes.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			return db.recipes.updateRecipe(id, userId, { isPublished });
		}),

	updateImage: protectedProcedure
		.input(z.object({ id: z.string(), imageSrc: z.string().nullable() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { id, imageSrc } = input;

			const recipe = await db.recipes.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			return db.recipes.updateImage(userId, id, imageSrc);
		}),

	deleteRecipe: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input: { id } }) => {
			const { userId } = ctx.auth;

			const recipe = await db.recipes.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			return db.recipes.deleteRecipe(userId, id);
		}),

	myFavorites: protectedProcedure.mutation(({ ctx }) => {
		return db.userFavorites.userFavorites(ctx.auth.userId);
	}),

	toggleUserFavorite: protectedProcedure
		.input(z.object({ recipeId: z.string() }))
		.mutation(({ ctx, input: { recipeId } }) => {
			return db.userFavorites.toggleUserFavorite(ctx.auth.userId, recipeId);
		}),

	importRecipe: publicProcedure
		.input(z.object({ url: z.string() }))
		.query(async ({ input: { url } }) => {
			return (await fetch(url)).text();
		}),

	findAppUser: protectedProcedure.query(({ ctx }) => {
		return db.users.user(ctx.auth.userId);
	}),
});
