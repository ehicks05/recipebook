'use server';

import { revalidatePath } from 'next/cache';
import { api } from 'trpc/server';

export const toggleFavorite = async ({ recipeId }: { recipeId: string }) => {
	try {
		await api.example.toggleUserFavorite({ recipeId });
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
