import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { recipes, userFavorites } from '@/db/schema';
import { authMiddleware, maybeUserMiddleware } from '@/lib/auth.middleware';

export type Recipe = Awaited<ReturnType<typeof getRecipes>>[number];
export type Ingredient = Recipe['ingredients'][number];
export type Step = Recipe['steps'][number];

const recipeAuth = (userId?: string) => ({
	OR: [{ isPublished: true }, userId ? { authorId: userId } : {}],
});
const recipeWith = (userId?: string) =>
	({
		author: { columns: { name: true } },
		favoritedBy: { where: { id: userId || 'INVALID' }, columns: { id: true } },
	}) as const;

export const getRecipes = createServerFn()
	.middleware([maybeUserMiddleware])
	.handler(async ({ context: { user } }) => {
		const recipes = await db.query.recipes.findMany({
			where: { ...recipeAuth(user?.id) },
			orderBy: { isFeatured: 'desc', createdAt: 'desc' },
			with: recipeWith(user?.id),
		});

		return recipes;
	});

export const getRecipesByUser = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context: { user } }) => {
		const recipes = await db.query.recipes.findMany({
			where: { authorId: user.id },
			orderBy: { createdAt: 'desc' },
			with: recipeWith(user?.id),
		});

		return recipes;
	});

export type UserFavorite = Awaited<ReturnType<typeof getFavoritesByUser>>[number];

export const getFavoritesByUser = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context: { user } }) => {
		const recipes = await db.query.recipes.findMany({
			where: { authorId: user.id, favoritedBy: { id: user.id } },
			orderBy: { createdAt: 'desc' },
			with: recipeWith(user?.id),
		});

		return recipes;
	});

export const getRecipe = createServerFn()
	.middleware([maybeUserMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ context: { user }, data: { id } }) => {
		const recipe = await db.query.recipes.findFirst({
			where: { id, ...recipeAuth(user?.id) },
			with: recipeWith(user?.id),
		});

		return recipe;
	});

export type NewRecipe = Omit<typeof recipes.$inferInsert, 'authorId'>;

export const createRecipe = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { recipe: NewRecipe }) => data)
	.handler(async ({ context: { user }, data: { recipe } }) => {
		const result = await db
			.insert(recipes)
			.values({ ...recipe, authorId: user.id })
			.returning();

		return result[0];
	});

export type UpdateRecipe = Partial<NewRecipe>;

export const updateRecipe = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { id: string; recipe: UpdateRecipe }) => data)
	.handler(async ({ context: { user }, data: { id, recipe } }) => {
		const existingRecipe = await db.query.recipes.findFirst({ where: { id } });
		if (!existingRecipe) {
			throw new Error('NOT FOUND');
		}
		if (user.id !== existingRecipe.authorId) {
			throw new Error('UNAUTHORIZED');
		}

		// publish/unpublish shouldn't set updatedAt
		const isTogglingIsPublished =
			Object.keys(recipe).length === 1 && recipe.isPublished !== undefined;
		const updatedAt = isTogglingIsPublished ? undefined : new Date();

		const result = await db
			.update(recipes)
			.set({ ...recipe, updatedAt })
			.where(eq(recipes.id, id))
			.returning();

		return result[0];
	});

export const deleteRecipe = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ context: { user }, data: { id } }) => {
		const existingRecipe = await db.query.recipes.findFirst({ where: { id } });
		if (!existingRecipe) {
			throw new Error('NOT FOUND');
		}
		if (user.id !== existingRecipe.authorId) {
			throw new Error('UNAUTHORIZED');
		}

		await db.delete(recipes).where(eq(recipes.id, id));
	});

export const toggleFavorite = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { recipeId: string }) => data)
	.handler(async ({ context: { user }, data: { recipeId } }) => {
		const existingFavorite = await db.query.userFavorites.findFirst({
			where: { userId: user.id, recipeId },
		});
		if (existingFavorite) {
			await db
				.delete(userFavorites)
				.where(
					and(
						eq(userFavorites.userId, user.id),
						eq(userFavorites.recipeId, recipeId),
					),
				);
		} else {
			await db.insert(userFavorites).values({ userId: user.id, recipeId });
		}
	});
