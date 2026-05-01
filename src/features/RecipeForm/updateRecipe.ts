import { id } from '@instantdb/react';
import { forEachAsync } from 'es-toolkit';
import { clientDb } from '@/lib/db';
import type { FormRecipe } from './types';

const getExistingIngredientIds = async (recipeId: string) => {
	return (
		await clientDb.queryOnce({
			ingredients: { $: { where: { 'recipe.id': recipeId } } },
		})
	).data.ingredients.map((i) => i.id);
};

interface Params {
	recipeId: string;
	recipe: FormRecipe;
}

export const updateRecipe = async ({ recipeId, recipe }: Params) => {
	const recipeTx = clientDb.tx.recipes[recipeId].merge({
		cookingTime: recipe.cookingTime,
		description: recipe.description,
		emoji: recipe.emoji,
		isPublished: recipe.isPublished,
		name: recipe.name,
		servings: recipe.servings,
		source: recipe.source,
		steps: recipe.steps,
		updatedAt: JSON.stringify(new Date()),
	});

	const existingIngredientIds = await getExistingIngredientIds(recipeId);
	const deleteExistingIngredientsTxs = existingIngredientIds.map((id) =>
		clientDb.tx.ingredients[id].delete(),
	);

	const ingredientTxs = recipe.ingredients.map((ingredient) =>
		clientDb.tx.ingredients[id()]
			.create({
				name: ingredient.name,
				unit: ingredient.unit,
				quantity: ingredient.quantity,
			})
			.link({ recipe: recipeId }),
	);

	await clientDb.transact(deleteExistingIngredientsTxs);

	await forEachAsync(
		[recipeTx, ...ingredientTxs],
		async (tx) => {
			clientDb.transact(tx);
		},
		{ concurrency: 1 },
	);
};
