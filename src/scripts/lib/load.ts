import { forEachAsync } from 'es-toolkit';
import { adminDb } from '@/lib/adminDb';
import { fetchFile } from './fetchFile';
import type { $Users } from './types';

/**
 * Wipe db and repopulate it.
 */
export const load = async ($users: $Users, localFilePath?: string) => {
	// delete users. recipes, ingredients, and image files should cascade
	await adminDb.transact($users.map(({ id }) => adminDb.tx.$users[id].delete()));

	const recipes = $users.flatMap((user) => user.recipes);

	// create users
	await forEachAsync(
		$users,
		async (user) => {
			await adminDb.transact([
				adminDb.tx.$users[user.id].create({
					createdAt: user.createdAt,
					displayName: user.displayName,
					email: user.email,
					imageUrl: user.imageUrl,
					imageURL: user.imageURL,
					type: user.type,
				}),
			]);
		},
		{ concurrency: 1 },
	);

	// create recipes
	// link: author, favoritedBy
	await forEachAsync(
		$users,
		async (user) => {
			const txs = user.recipes.map((recipe) =>
				adminDb.tx.recipes[recipe.id]
					.create({
						cookingTime: recipe.cookingTime,
						createdAt: recipe.createdAt,
						description: recipe.description,
						emoji: recipe.emoji,
						isPublished: recipe.isPublished,
						name: recipe.name,
						servings: recipe.servings,
						source: recipe.source,
						steps: recipe.steps,
						updatedAt: recipe.updatedAt,
						isFeatured: recipe.isFeatured,
					})
					.link({
						author: user.id,
						favoritedBy: recipe.favoritedBy.map((o) => o.id),
					}),
			);
			await adminDb.transact(txs);
		},
		{ concurrency: 1 },
	);

	// create ingredients
	// link: recipe
	await forEachAsync(
		recipes,
		async (recipe) => {
			await forEachAsync(
				recipe.ingredients,
				async (ingredient) => {
					const tx = adminDb.tx.ingredients[ingredient.id]
						.create({
							name: ingredient.name,
							quantity: ingredient.quantity,
							unit: ingredient.unit,
						})
						.link({
							recipe: recipe.id,
						});

					await adminDb.transact(tx);
				},
				{ concurrency: 1 },
			);
		},
		{ concurrency: 1 },
	);

	// create files
	// link: recipe
	await forEachAsync(
		recipes.filter((o) => o.image),
		async (recipe) => {
			const file = recipe.image;
			if (!file) return;

			const buffer = await fetchFile(file, localFilePath);

			const { data } = await adminDb.storage.uploadFile(file.path, buffer);

			await adminDb.transact(adminDb.tx.$files[data.id].link({ recipe: recipe.id }));
		},
		{ concurrency: 1 },
	);
};
