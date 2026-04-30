import { sample } from 'es-toolkit';
import { adminDb } from './lib/adminDb.js';

export const featureRecipe = async () => {
	console.log('Running featured recipe update task...');

	const { recipes } = await adminDb.query({ recipes: {} });

	const prevFeaturedRecipe = recipes.find((recipe) => recipe.isFeatured);
	if (prevFeaturedRecipe) {
		await adminDb.transact(
			adminDb.tx.recipes[prevFeaturedRecipe.id].update({ isFeatured: false }),
		);
	}

	const nextFeaturedRecipe = sample(recipes);

	await adminDb.transact(
		adminDb.tx.recipes[nextFeaturedRecipe.id].update({ isFeatured: true }),
	);

	return { result: 'Success' };
};
