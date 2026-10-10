import { createServerFn } from '@tanstack/react-start';
import { db } from '@/db';

export type Recipe = Awaited<ReturnType<typeof getRecipes>>[number];

export const getRecipes = createServerFn().handler(async () => {
	const recipes = await db.query.recipes.findMany({
		orderBy: { isFeatured: 'desc', createdAt: 'desc' },
		with: { author: true, ingredients: true, favoritedBy: true },
	});

	return recipes;
});
