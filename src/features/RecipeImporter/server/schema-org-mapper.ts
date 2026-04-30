import type { Recipe } from 'schema-dts';
import { parseIngredient } from '@/features/RecipeImporter/server/parse-ingredient';
import { parseDirections } from './parse-directions';
import { parseServings } from './parse-servings';

const FAKE_ID = '1337';

export const schemaOrgRecipeToRecipeBookRecipe = (
	recipe: Recipe,
	authorName: string,
	url: string,
): RecipeFull => {
	// @ts-ignore
	return {
		id: FAKE_ID,
		name: recipe.name?.toString() || 'missing',
		description: recipe.description?.toString() || 'missing',
		authorId: FAKE_ID,
		createdAt: new Date(),
		updatedAt: new Date(),
		author: { displayName: authorName || 'John Dough' },
		emoji: '🍲',
		servings: parseServings(recipe.recipeYield?.toString() || ''),
		cookingTime: recipe.totalTime?.toString().replace('PT', '') || 'missing',
		isPublished: true,
		source: url,
		imageSrc: '',
		ingredients: ((recipe.recipeIngredient || []) as string[])
			.map(parseIngredient)
			.map((i, index) => ({
				id: FAKE_ID,
				recipeId: FAKE_ID,
				index: String(index),
				name: i.name,
				quantity: i.quantity,
				unit: i.unit,
			})),
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		directions: parseDirections(recipe.recipeInstructions || ([] as any)).map(
			(i, index) => ({
				id: FAKE_ID,
				recipeId: FAKE_ID,
				index,
				text: i.text,
			}),
		),
	};
};
