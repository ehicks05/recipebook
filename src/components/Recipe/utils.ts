import type { RecipeFull, Direction, Ingredient } from 'trpc/types';

function updateClipboard(newClip: string) {
	navigator.clipboard.writeText(newClip).then(
		(e) => console.log(e),
		(e) => console.log(e),
	);
}

// How /recipe data differs from the json file:
// 1. id is added on recipe and nested objects
// 2. audit dates are added on recipe
// 3. author is added on recipe
// 4. emoji is a literal emoji
// 5. direction indexes are added

const omitIngredient = (i: Ingredient) => ({
	...i,
	id: undefined,
});
const omitDirection = (i: Direction) => ({
	...i,
	id: undefined,
	index: undefined,
});

function stripRecipe(recipe: RecipeFull) {
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
