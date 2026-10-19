import { createServerFn } from '@tanstack/react-start';
import { authMiddleware } from '@/lib/auth.middleware';
import { toggleUserFavorite } from './userFavorites.server';

export const toggleFavorite = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { recipeId: string }) => data)
	.handler(async ({ context: { user }, data: { recipeId } }) =>
		toggleUserFavorite({ userId: user.id, recipeId }),
	);
