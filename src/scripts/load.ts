import { init } from '@instantdb/admin';
import { forEachAsync } from 'es-toolkit';
import { adminDb } from '@/lib/adminDb';
import schema from '../instant.schema';

const appId = process.env.INSTANT_APP_PROD_ID!;
const adminToken = process.env.INSTANT_APP_PROD_ADMIN_TOKEN;

export const prodDb = init({
	appId,
	adminToken,
	schema,
	useDateObjects: false,
});

const loadFromProd = async () => {
	const { $users } = await prodDb.query({
		$users: {
			recipes: {
				favoritedBy: { $: { fields: ['id'] } },
				image: {},
				ingredients: {},
			},
		},
	});
	const recipes = $users.flatMap((user) => user.recipes);

	// delete users
	await adminDb.transact($users.map(({ id }) => adminDb.tx.$users[id].delete()));
	// delete recipes, ingredients should cascade
	await adminDb.transact(recipes.map(({ id }) => adminDb.tx.recipes[id].delete()));
	// delete files
	const { $files } = await adminDb.query({ $files: {} });
	await adminDb.transact($files.map(({ id }) => adminDb.tx.$files[id].delete()));

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

			const response = await fetch(file.url);
			const blob = await response.blob();
			const ab = await blob.arrayBuffer();
			const buffer = Buffer.from(ab);

			const { data } = await adminDb.storage.uploadFile(file.path, buffer);

			await adminDb.transact(adminDb.tx.$files[data.id].link({ recipe: recipe.id }));
		},
		{ concurrency: 1 },
	);
};

loadFromProd();
