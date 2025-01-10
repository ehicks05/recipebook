import type { Prisma } from '@prisma/client';
import { prisma } from 'server/db';
import { utapi } from 'utils/uploadthingApi';
import type { RecipeCreate, RecipeUpdate } from '../schema';
import { recipeIncludes, recipeIncludesLite } from './utils';

const isPublishedClause = (userId: string | null) => ({
	OR: [{ isPublished: true }, ...(userId ? [{ authorId: userId }] : [])],
});

const _recipes = async (userId: string | null) =>
	prisma.recipe.findMany({
		where: isPublishedClause(userId),
		orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
		...recipeIncludes(userId),
	});

const recipeById = async (id: string) =>
	prisma.recipe.findUnique({ where: { id }, ...recipeIncludes(null) });

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

const createRecipe = async (userId: string, input: RecipeCreate) => {
	const { directions, ingredients, ...recipeFields } = input;

	return prisma.recipe.create({
		data: {
			...recipeFields,
			author: { connect: { id: userId } },
			directions: { createMany: { data: directions } },
			ingredients: { createMany: { data: ingredients } },
		},
		...recipeIncludes(userId),
	});
};

const updateRecipe = async (
	id: string,
	userId: string,
	data: Prisma.recipeUpdateInput,
) => prisma.recipe.update({ where: { id }, data, ...recipeIncludes(userId) });

const updateRecipeNested = async (
	id: string,
	userId: string,
	input: RecipeUpdate,
) => {
	const { directions, ingredients, ...recipeFields } = input;
	const data = {
		...recipeFields,
		author: { connect: { id: userId } },
		directions: { createMany: { data: directions } },
		ingredients: { createMany: { data: ingredients } },
	};

	return prisma.$transaction([
		prisma.ingredient.deleteMany({ where: { recipeId: id } }),
		prisma.direction.deleteMany({ where: { recipeId: id } }),
		prisma.recipe.update({
			where: { id },
			data,
			...recipeIncludes(userId),
		}),
	]);
};

/**
 * 1. If no change, noop
 * 2. If an image already exists, delete it
 * 3. update recipe
 */
const updateImage = async (userId: string, id: string, imageSrc: string | null) => {
	const recipe = await recipes.recipeById(id);
	if (userId !== recipe?.authorId) {
		throw new Error('Unauthorized');
	}

	if (imageSrc === recipe.imageSrc) {
		return recipe;
	}

	if (recipe.imageSrc) {
		const { success } = await utapi.deleteFiles(recipe.imageSrc);
		if (!success) {
			console.error(`Failed to delete image ${recipe.imageSrc}`);
		}
	}

	return prisma.recipe.update({
		where: { id },
		data: { imageSrc },
		...recipeIncludes(userId),
	});
};

const deleteRecipe = async (userId: string, id: string) => {
	const recipe = await recipes.recipeById(id);
	if (userId !== recipe?.authorId) {
		throw new Error('Unauthorized');
	}

	const { imageSrc } = recipe;
	if (imageSrc) {
		await utapi.deleteFiles(imageSrc);
	}

	return prisma.recipe.delete({ where: { id } });
};

export const recipes = {
	recipes: _recipes,
	recipeById,
	recipesByAuthor,
	featuredRecipe,
	deleteRecipe,
	createRecipe,
	updateRecipe,
	updateImage,
	updateRecipeNested,
};
