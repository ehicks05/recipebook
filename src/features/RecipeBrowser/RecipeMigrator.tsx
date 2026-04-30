'use client';

import { id } from '@instantdb/react';
import { sortBy } from 'es-toolkit/compat';
import { Button } from '@/components/core';
import { RECIPE_EXPORT } from '@/data';
import { clientDb } from '@/lib/db';

export const RecipeMigrator = () => {
	const { id: userId } = clientDb.useUser();
	const { data } = clientDb.useQuery({ recipes: {} });
	const { recipes } = data || {};

	const deleteExisting = async () => {
		clientDb.transact(
			(recipes || []).map((r) => clientDb.tx.recipes[r.id].delete()),
		);
	};

	const migrate = async (userId: string) => {
		sortBy(RECIPE_EXPORT, (o) => o.created_at).forEach((recipe) => {
			const recipeId = id();

			const recipeTx = clientDb.tx.recipes[recipeId]
				.create({
					cookingTime: recipe.cooking_time,
					createdAt: recipe.created_at,
					description: recipe.description,
					emoji: recipe.emoji,
					// imageSrc: recipe.image_src,
					isFeatured: recipe.is_featured,
					isPublished: recipe.is_published,
					name: recipe.name,
					servings: recipe.servings,
					source: recipe.source || '',
					steps: recipe.directions.map((step) => ({ text: step.text })),
					updatedAt: recipe.updated_at,
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

			clientDb.transact([recipeTx, ...ingredientTxs]);
		});
	};

	return (
		<Button
			onClick={async () => {
				await deleteExisting();
				await migrate(userId);
			}}
		>
			Migrate recipes from postgres dump
		</Button>
	);
};
