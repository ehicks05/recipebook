import { id } from '@instantdb/react';
import { clientDb } from '@/lib/db';
import type { FormRecipe } from './types';

interface Params {
	userId: string;
	recipe: FormRecipe;
}

export const createRecipe = async ({ userId, recipe }: Params) => {
	const recipeId = id();

	const recipeTx = clientDb.tx.recipes[recipeId]
		.create({
			cookingTime: recipe.cookingTime,
			description: recipe.description,
			emoji: recipe.emoji,
			isPublished: recipe.isPublished,
			name: recipe.name,
			servings: recipe.servings,
			source: recipe.source,
			steps: recipe.steps,
			createdAt: JSON.stringify(new Date()),
			updatedAt: JSON.stringify(new Date()),
		})
		.link({ author: userId });

	const ingredientTxs = recipe.ingredients.map((ingredient) =>
		clientDb.tx.ingredients[id()]
			.create({
				name: ingredient.name,
				unit: ingredient.unit,
				quantity: ingredient.quantity,
			})
			.link({ recipe: recipeId }),
	);

	await clientDb.transact([recipeTx, ...ingredientTxs]);
	return recipeId;
};
