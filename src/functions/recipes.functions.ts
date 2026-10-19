import { createServerFn } from '@tanstack/react-start';
import { db } from '@/db';
import { authMiddleware, maybeUserMiddleware } from '@/lib/auth.middleware';
import {
	createServerRecipe,
	deleteServerRecipe,
	getAuthoredRecipes,
	getFavoritedRecipes,
	getServerRecipe,
	getServerRecipes,
	type RecipeInsert,
	type RecipeUpdate,
	updateServerRecipe,
} from './recipes.server';

export type Recipe = Awaited<ReturnType<typeof getRecipes>>[number];
export type Ingredient = Recipe['ingredients'][number];
export type Step = Recipe['steps'][number];

export const getRecipes = createServerFn()
	.middleware([maybeUserMiddleware])
	.handler(async ({ context: { user } }) => getServerRecipes({ user }));

export const getRecipesByUser = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context: { user } }) => getAuthoredRecipes({ user }));

export const getFavoritesByUser = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context: { user } }) => getFavoritedRecipes({ user }));

export const getRecipe = createServerFn()
	.middleware([maybeUserMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ context: { user }, data: { id } }) =>
		getServerRecipe({ user, id }),
	);

export const createRecipe = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { recipe: Omit<RecipeInsert, 'authorId'> }) => data)
	.handler(async ({ context: { user }, data: { recipe } }) =>
		createServerRecipe({ recipe: { ...recipe, authorId: user.id } }),
	);

const authorizeMut = async ({ authorId, id }: { authorId: string; id: string }) => {
	const recipe = await db.query.recipes.findFirst({ where: { id, authorId } });
	if (!recipe) {
		throw new Error('NOT FOUND');
	}
};

export const updateRecipe = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { recipe: RecipeUpdate }) => data)
	.handler(async ({ context: { user }, data: { recipe } }) => {
		await authorizeMut({ id: recipe.id, authorId: user.id });
		return await updateServerRecipe({ recipe });
	});

export const deleteRecipe = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ context: { user }, data: { id } }) => {
		await authorizeMut({ id, authorId: user.id });
		await deleteServerRecipe({ id });
	});
