import { prisma } from 'server/db';
import { recipeIncludes } from './utils';

const _userFavorites = async (userId: string) =>
	(
		await prisma.userFavorites.findMany({
			where: { userId },
			include: { recipe: { ...recipeIncludes(userId) } },
		})
	).map((o) => o.recipe);

const deleteFavorite = async (userId: string, recipeId: string) =>
	prisma.userFavorites.delete({ where: { userId_recipeId: { userId, recipeId } } });

const createFavorite = async (userId: string, recipeId: string) =>
	prisma.userFavorites.create({ data: { userId, recipeId } });

const toggleUserFavorite = async (userId: string, recipeId: string) => {
	const favorite = await prisma.userFavorites.findUnique({
		where: { userId_recipeId: { userId, recipeId } },
	});
	favorite
		? await deleteFavorite(userId, recipeId)
		: await createFavorite(userId, recipeId);
	return { title: `Recipe ${favorite ? 'removed from' : 'added to'} favorites` };
};

export const userFavorites = {
	userFavorites: _userFavorites,
	toggleUserFavorite,
};
