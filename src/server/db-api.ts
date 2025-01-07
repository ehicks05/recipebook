import { Prisma } from '@prisma/client';
import { prisma } from 'server/db';

// Get type of recipe with includes added
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const recipeWithIncludes = Prisma.validator<Prisma.recipeDefaultArgs>()({
	include: {
		author: true,
		directions: true,
		ingredients: true,
		userFavorites: {
			select: { userId: true },
		},
	},
});
export type CompleteRecipe = Prisma.recipeGetPayload<typeof recipeWithIncludes>;

// This is the recipeWithIncludes shape, with a where clause that filters the
// favorites so users only see their own.
const recipeIncludes = (userId: string | null) => {
	return {
		include: {
			author: true,
			directions: true,
			ingredients: true,
			userFavorites: {
				where: { userId: userId || undefined },
				select: { userId: true },
			},
		},
	};
};

// RECIPES
const isPublishedClause = (userId: string | null) => ({
	OR: [{ isPublished: true }, ...(userId ? [{ authorId: userId }] : [])],
});

const recipes = async (userId: string | null) =>
	prisma.recipe.findMany({
		where: isPublishedClause(userId),
		orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
		...recipeIncludes(userId),
	});

const recipeById = async (id: string) =>
	prisma.recipe.findUnique({
		where: { id },
		...recipeIncludes(null),
	});

const recipesByAuthor = (userId: string) =>
	prisma.recipe.findMany({
		where: { authorId: userId },
		orderBy: { createdAt: 'desc' },
		...recipeIncludes(userId),
	});

const featuredRecipe = async (userId: string | null) =>
	prisma.recipe.findFirst({
		where: { isFeatured: true },
		...recipeIncludes(userId),
	});

const deleteRecipe = async (id: string) => prisma.recipe.delete({ where: { id } });

const createRecipe = async (userId: string, data: Prisma.recipeCreateInput) =>
	prisma.recipe.create({
		data,
		...recipeIncludes(userId),
	});

const updateRecipe = async (
	id: string,
	userId: string,
	data: Prisma.recipeUpdateInput,
) =>
	prisma.recipe.update({
		where: { id },
		data,
		...recipeIncludes(userId),
	});

const updateRecipeNested = async (
	recipeId: string,
	userId: string,
	data: Prisma.recipeUpdateInput,
) =>
	prisma.$transaction([
		prisma.ingredient.deleteMany({ where: { recipeId } }),
		prisma.direction.deleteMany({ where: { recipeId } }),
		prisma.recipe.update({
			where: { id: recipeId },
			data,
			...recipeIncludes(userId),
		}),
	]);

// USERS
const user = async (userId: string) =>
	prisma.appUser.findUnique({ where: { id: userId } });

const createUser = async ({
	id,
	displayName,
}: { id?: string; displayName: string | null }) =>
	prisma.appUser.create({ data: { id, displayName } });

const updateUser = async ({
	id,
	displayName,
}: { id?: string; displayName: string | null }) =>
	prisma.appUser.upsert({
		where: { id },
		create: { id, displayName },
		update: { id, displayName },
	});

// USER_FAVORITES
const userFavoriteRecipes = async (userId: string) =>
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

export const api = {
	recipes,
	recipeById,
	recipesByAuthor,
	featuredRecipe,
	deleteRecipe,
	createRecipe,
	updateRecipe,
	updateRecipeNested,

	user,
	createUser,
	updateUser,

	userFavoriteRecipes,
	deleteFavorite,
	createFavorite,
	toggleUserFavorite,
};
