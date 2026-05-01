import type { Recipe } from 'schema-dts';
import { parseIngredient } from '@/features/RecipeImporter/server/parse-ingredient';
import type { Recipe as IRecipe } from '@/instant.types';
import { parseServings } from './parse-servings';
import { parseSteps } from './parse-steps';

const FAKE_ID = '1337';

export const schemaOrgRecipeToRecipeBookRecipe = (
	recipe: Recipe,
	authorName: string,
	url: string,
): IRecipe => {
	return {
		id: FAKE_ID,
		name: recipe.name?.toString() || 'missing',
		description: recipe.description?.toString() || 'missing',
		createdAt: JSON.stringify(new Date()),
		updatedAt: JSON.stringify(new Date()),
		author: { id: FAKE_ID, displayName: authorName || 'John Dough' },
		emoji: '🍲',
		servings: parseServings(recipe.recipeYield?.toString() || ''),
		cookingTime: recipe.totalTime?.toString().replace('PT', '') || 'missing',
		isPublished: true,
		source: url,
		image: undefined,
		ingredients: ((recipe.recipeIngredient || []) as string[])
			.map(parseIngredient)
			.map((i) => ({
				id: FAKE_ID,
				name: i.name,
				quantity: i.quantity,
				unit: i.unit,
			})),
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		steps: parseSteps(recipe.recipeInstructions || ([] as any)).map(({ text }) => ({
			text,
		})),
		favoritedBy: [],
	};
};
