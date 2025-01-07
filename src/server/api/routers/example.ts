import { z } from 'zod';

import { RECIPE_SCHEMA } from 'components/RecipeForm/constants';
import { api } from 'server/db-api';
import { utapi } from 'utils/uploadthingApi';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
	findRecipes: publicProcedure.query(({ ctx }) => {
		const { userId } = ctx.auth;
		return api.recipes(userId);
	}),

	findRecipesByAuthorId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input: { id } }) => {
			return api.recipesByAuthor(id);
		}),

	findRecipe: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input: { id } }) => {
			return api.recipeById(id);
		}),

	findFavoriteRecipesByUserId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input: { id } }) => {
			return api.userFavoriteRecipes(id);
		}),

	getRecipeOfTheDay: publicProcedure.query(async ({ ctx }) => {
		return api.featuredRecipe(ctx.auth.userId);
	}),

	createRecipe: protectedProcedure
		.input(RECIPE_SCHEMA)
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { directions, ingredients, ...recipeFields } = input;

			return api.createRecipe(userId, {
				...recipeFields,
				author: { connect: { id: userId } },
				directions: { createMany: { data: directions } },
				ingredients: { createMany: { data: ingredients } },
			});
		}),

	updateRecipe: protectedProcedure
		.input(RECIPE_SCHEMA.extend({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { id: recipeId, directions, ingredients, ...recipeFields } = input;

			const recipe = await api.recipeById(recipeId);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			const [, , updatedRecipe] = await api.updateRecipeNested(recipeId, userId, {
				...recipeFields,
				author: { connect: { id: userId } },
				directions: { createMany: { data: directions } },
				ingredients: { createMany: { data: ingredients } },
			});

			return updatedRecipe;
		}),

	updatePublished: protectedProcedure
		.input(z.object({ id: z.string(), isPublished: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { id, isPublished } = input;

			const recipe = await api.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			return api.updateRecipe(id, userId, { isPublished });
		}),

	/**
	 * 1. Remove image from object storage
	 * 2. update recipe
	 */
	removeImage: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { id } = input;

			const recipe = await api.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			const { imageSrc } = recipe;
			if (!imageSrc) {
				throw new Error('No image found');
			}

			const { success } = await utapi.deleteFiles(imageSrc);
			if (!success) {
				throw new Error('Deletion failed on uploadthing');
			}

			return api.updateRecipe(id, userId, { imageSrc: null });
		}),

	/**
	 * 1. Remove image from object storage
	 * 2. remove recipe
	 */
	deleteRecipe: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input: { id } }) => {
			const { userId } = ctx.auth;

			const recipe = await api.recipeById(id);
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			const { imageSrc } = recipe;
			if (imageSrc) {
				await utapi.deleteFiles(imageSrc);
			}

			return api.deleteRecipe(id);
		}),

	createUserFavorite: protectedProcedure
		.input(z.object({ recipeId: z.string() }))
		.mutation(({ ctx, input: { recipeId } }) => {
			const { userId } = ctx.auth;

			return api.createFavorite(userId, recipeId);
		}),

	deleteUserFavorite: protectedProcedure
		.input(z.object({ recipeId: z.string() }))
		.mutation(({ ctx, input: { recipeId } }) => {
			const { userId } = ctx.auth;

			return api.deleteFavorite(userId, recipeId);
		}),

	importRecipe: publicProcedure
		.input(z.object({ url: z.string() }))
		.query(async ({ input: { url } }) => {
			return (await fetch(url)).text();
		}),

	findAppUser: protectedProcedure.query(({ ctx }) => {
		const { userId } = ctx.auth;

		return api.user(userId);
	}),

	updateAppUser: protectedProcedure
		.input(z.object({ displayName: z.string() }))
		.mutation(({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { displayName } = input;

			return api.updateUser({ id: userId, displayName });
		}),
});
