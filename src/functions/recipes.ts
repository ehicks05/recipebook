import { createServerFn } from '@tanstack/react-start';
import { db } from '@/db';
import { authMiddleware } from '@/lib/auth.middleware';
import { authClient } from '@/lib/auth-client';

export type Recipe = Awaited<ReturnType<typeof getRecipes>>[number];

export const getRecipes = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context: { user } }) => {
		authClient.getSession;
		const recipes = await db.query.recipes.findMany({
			orderBy: { isFeatured: 'desc', createdAt: 'desc' },
			with: { author: true, ingredients: true, favoritedBy: true },
		});

		return recipes;
	});
