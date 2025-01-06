import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { RECIPE_SCHEMA } from 'components/RecipeForm/constants';
import { utapi } from 'utils/uploadthingApi';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

const isPublishedClause = (userId: string | null | undefined) => ({
	OR: [{ isPublished: true }, ...(userId ? [{ authorId: userId }] : [])],
});

export const exampleRouter = createTRPCRouter({
	findRecipes: publicProcedure.query(({ ctx }) => {
		const { userId } = ctx.auth;

		return ctx.prisma.recipe.findMany({
			where: isPublishedClause(userId),
			orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
			...getCompleteRecipeInclude(userId),
		});
	}),

	findRecipesByAuthorId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input: { id } }) => {
			return ctx.prisma.recipe.findMany({
				where: { authorId: id },
				...getCompleteRecipeInclude(ctx.auth.userId),
				orderBy: { createdAt: 'desc' },
			});
		}),

	findRecipe: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input: { id } }) => {
			return ctx.prisma.recipe.findUnique({
				where: { id },
				...getCompleteRecipeInclude(ctx.auth.userId),
			});
		}),

	findFavoriteRecipesByUserId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input: { id } }) => {
			return ctx.prisma.userFavorites.findMany({
				where: { userId: id },
				include: {
					recipe: {
						...getCompleteRecipeInclude(ctx.auth.userId),
					},
				},
			});
		}),

	getRecipeOfTheDay: publicProcedure.query(async ({ ctx }) => {
		return ctx.prisma.recipe.findFirst({
			where: { isFeatured: true },
			...getCompleteRecipeInclude(ctx.auth.userId),
		});
	}),

	createRecipe: protectedProcedure
		.input(RECIPE_SCHEMA)
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx.auth;

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
				...getCompleteRecipeInclude(userId),
			});
		}),

	updateRecipe: protectedProcedure
		.input(RECIPE_SCHEMA.extend({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { id: recipeId } = input;
			const { userId } = ctx.auth;
			const recipe = await ctx.prisma.recipe.findUnique({
				where: { id: recipeId },
			});
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
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
					...getCompleteRecipeInclude(userId),
				}),
			]);

			return updatedRecipe;
		}),

	updatePublished: protectedProcedure
		.input(z.object({ id: z.string(), isPublished: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const { id, isPublished } = input;
			const { userId } = ctx.auth;
			const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			return ctx.prisma.recipe.update({
				where: { id },
				data: { isPublished },
				...getCompleteRecipeInclude(userId),
			});
		}),

	/**
	 * 1. Remove image from object storage
	 * 2. update recipe
	 */
	removeImage: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { id } = input;
			const { userId } = ctx.auth;
			const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });
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

			return ctx.prisma.recipe.update({
				where: { id },
				data: { imageSrc: null },
				...getCompleteRecipeInclude(userId),
			});
		}),

	/**
	 * 1. Remove image from object storage
	 * 2. remove recipe
	 */
	deleteRecipe: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input: { id } }) => {
			const { userId } = ctx.auth;
			const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });
			if (userId !== recipe?.authorId) {
				throw new Error('Unauthorized');
			}

			const { imageSrc } = recipe;
			if (imageSrc) {
				await utapi.deleteFiles(imageSrc);
			}

			return ctx.prisma.recipe.delete({ where: { id } });
		}),

	createUserFavorite: protectedProcedure
		.input(z.object({ recipeId: z.string() }))
		.mutation(({ ctx, input: { recipeId } }) => {
			const { userId } = ctx.auth;

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
			const { userId } = ctx.auth;

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
			return (await fetch(url)).text();
		}),

	findAppUser: protectedProcedure.query(({ ctx }) => {
		const { userId } = ctx.auth;
		return ctx.prisma.appUser.findUnique({ where: { id: userId } });
	}),

	updateAppUser: protectedProcedure
		.input(z.object({ displayName: z.string() }))
		.mutation(({ ctx, input }) => {
			const { userId } = ctx.auth;
			const { displayName } = input;
			return ctx.prisma.appUser.update({
				where: { id: userId },
				data: { displayName },
			});
		}),
});

// Get type of recipe with includes added
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
export const getCompleteRecipeInclude = (userId: string | null) => {
	return {
		include: {
			author: true,
			directions: true,
			ingredients: true,
			userFavorites: {
				where: { userId: userId || undefined },
				select: { userId: true },
			},
		},
	};
};

export const completeRecipeIncludeForType = {
	include: {
		author: true,
		directions: true,
		ingredients: true,
		userFavorites: {
			select: { userId: true },
		},
	},
};

const completeRecipe = Prisma.validator<Prisma.recipeDefaultArgs>()(
	completeRecipeIncludeForType,
);
export type CompleteRecipe = Prisma.recipeGetPayload<typeof completeRecipe>;
