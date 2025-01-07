'use server';

import { revalidatePath } from 'next/cache';
import { api } from 'server/db-api';

export const toggleFavorite = async ({
	userId,
	recipeId,
}: { userId: string; recipeId: string }) => {
	try {
		await api.toggleUserFavorite(userId, recipeId);
		revalidatePath('/');
	} catch (e) {
		const err = e instanceof Error ? e : undefined;
		return {
			err,
			title: 'Unable to update favorites',
		};
	}
	return { title: 'Favorites updated' };
};
