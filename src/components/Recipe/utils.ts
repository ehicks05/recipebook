import type { direction, ingredient } from '@prisma/client';
import type { CompleteRecipe } from 'server/db-api';

function updateClipboard(newClip: string) {
	navigator.clipboard.writeText(newClip).then(
		(e) => console.log(e),
		(e) => console.log(e),
	);
}

// How /recipe data differs from the json file:
// 1. id is added on recipe and nested objects
// 2. audit dates are added on recipe and all nested objects
// 3. author is added on recipe
// 4. emoji is a literal emoji
// 5. direction indexes are added

const omitIngredient = (i: ingredient) => ({
	...i,
	id: undefined,
	createdAt: undefined,
	updatedAt: undefined,
});
const omitDirection = (i: direction) => ({
	...i,
	id: undefined,
	createdAt: undefined,
	updatedAt: undefined,
	index: undefined,
});

function stripRecipe(recipe: CompleteRecipe) {
	return {
		...recipe,
		id: undefined,
		createdAt: undefined,
		updatedAt: undefined,
		author: undefined,
		ingredients: recipe.ingredients.map(omitIngredient),
		directions: recipe.directions.map(omitDirection),
	};
}

export { updateClipboard, stripRecipe };
