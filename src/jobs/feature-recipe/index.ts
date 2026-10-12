import { eq } from 'drizzle-orm';
import { sample } from 'es-toolkit';
import { db } from '@/db';
import { recipes } from '@/db/schema';

export const featureRecipe = async () => {
	console.log('Featuring a recipe...');

	const _recipes = await db.query.recipes.findMany({ where: { isPublished: true } });

	const featuredRecipes = _recipes.filter((recipe) => recipe.isFeatured);
	if (featuredRecipes.length !== 0) {
		await db.update(recipes).set({ isFeatured: false });
	}

	const nextFeaturedRecipe = sample(_recipes);
	await db
		.update(recipes)
		.set({ isFeatured: true })
		.where(eq(recipes.id, nextFeaturedRecipe.id));

	console.log('Done.');
};
