import { sample } from 'es-toolkit';
import { adminDb } from '@/lib/adminDb';

export const featureRecipe = async () => {
	console.log('Featuring a recipe...');

	const { recipes } = await adminDb.query({
		recipes: { $: { where: { isPublished: true } } },
	});

	const featuredRecipes = recipes.filter((recipe) => recipe.isFeatured);
	if (featuredRecipes.length !== 0) {
		await adminDb.transact(
			featuredRecipes.map(({ id }) =>
				adminDb.tx.recipes[id].update({ isFeatured: false }),
			),
		);
	}

	const nextFeaturedRecipe = sample(recipes);

	await adminDb.transact(
		adminDb.tx.recipes[nextFeaturedRecipe.id].update({ isFeatured: true }),
	);

	console.log('Done.');
};
