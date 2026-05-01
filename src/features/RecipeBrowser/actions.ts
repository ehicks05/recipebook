'use server';

import { clientDb } from '@/lib/db';

interface Params {
	userId: string;
	recipeId: string;
	isUserFavorite: boolean;
}

export const toggleFavorite = async ({
	userId,
	recipeId,
	isUserFavorite,
}: Params) => {
	try {
		clientDb.transact(
			isUserFavorite
				? clientDb.tx.$users[userId].unlink({ favoriteRecipes: recipeId })
				: clientDb.tx.$users[userId].link({ favoriteRecipes: recipeId }),
		);
	} catch (e) {
		const err = e instanceof Error ? e : undefined;
		return {
			err,
			title: 'Unable to update favorites',
		};
	}
	return { title: 'Favorites updated' };
};
