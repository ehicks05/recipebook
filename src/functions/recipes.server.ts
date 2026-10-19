import type { User } from 'better-auth';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { recipes } from '@/db/schema';

export type Recipe = Awaited<ReturnType<typeof getServerRecipes>>[number];
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

export const getServerRecipes = async ({ user }: { user?: User }) => {
	const recipes = await db.query.recipes.findMany({
		where: { ...recipeAuth(user?.id) },
		orderBy: { isFeatured: 'desc', createdAt: 'desc' },
		with: recipeWith(user?.id),
	});

	return recipes;
};

export const getServerRecipe = async ({ user, id }: { user?: User; id: string }) => {
	const recipe = await db.query.recipes.findFirst({
		where: { id, ...recipeAuth(user?.id) },
		with: recipeWith(user?.id),
	});

	return recipe;
};

export const getAuthoredRecipes = async ({ user }: { user: User }) => {
	const recipes = await db.query.recipes.findMany({
		where: { authorId: user.id },
		orderBy: { createdAt: 'desc' },
		with: recipeWith(user?.id),
	});

	return recipes;
};

export const getFavoritedRecipes = async ({ user }: { user: User }) => {
	const recipes = await db.query.recipes.findMany({
		where: { authorId: user.id, favoritedBy: { id: user.id } },
		orderBy: { createdAt: 'desc' },
		with: recipeWith(user?.id),
	});

	return recipes;
};

export type RecipeInsert = typeof recipes.$inferInsert;

export const createServerRecipe = async ({ recipe }: { recipe: RecipeInsert }) => {
	const result = await db.insert(recipes).values(recipe).returning();

	return result[0];
};

export type RecipeUpdate = Partial<RecipeInsert> & { id: string };

export const updateServerRecipe = async ({ recipe }: { recipe: RecipeUpdate }) => {
	// publish/unpublish shouldn't set updatedAt
	const isTogglingIsPublished =
		Object.keys(recipe).length === 1 && recipe.isPublished !== undefined;
	const updatedAt = isTogglingIsPublished ? undefined : new Date();

	const result = await db
		.update(recipes)
		.set({ ...recipe, updatedAt })
		.where(eq(recipes.id, recipe.id))
		.returning();

	console.log({ result });

	return result[0];
};

export const deleteServerRecipe = async ({ id }: { id: string }) => {
	await db.delete(recipes).where(eq(recipes.id, id));
};
