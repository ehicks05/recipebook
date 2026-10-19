import type { Recipe as SchemaOrgRecipe } from 'schema-dts';
import { parseIngredient } from '@/features/RecipeImporter/server/parse-ingredient';
import type { Recipe } from '@/functions/recipes';
import { parseServings } from './parse-servings';
import { parseSteps } from './parse-steps';

const FAKE_ID = '1337';

interface Params {
	recipe: SchemaOrgRecipe;
	authorName: string;
	url: string;
}

export const parseSchemaOrgRecipe = ({
	recipe,
	authorName,
	url,
}: Params): Recipe => ({
	id: FAKE_ID,
	name: recipe.name?.toString() || 'missing',
	description: recipe.description?.toString() || 'missing',
	createdAt: new Date(),
	updatedAt: new Date(),
	author: { name: authorName || 'John Dough' },
	authorId: '',
	emoji: '🍲',
	servings: parseServings(recipe.recipeYield?.toString() || ''),
	cookingTime: recipe.totalTime?.toString().replace('PT', '') || 'missing',
	isPublished: true,
	source: url,
	ingredients: ((recipe.recipeIngredient || []) as string[])
		.map(parseIngredient)
		.map((i) => ({ name: i.name, quantity: i.quantity, unit: i.unit })),
	// biome-ignore lint/suspicious/noExplicitAny: don't know
	steps: parseSteps(recipe.recipeInstructions || ([] as any)).map(({ text }) => ({
		text,
	})),
	favoritedBy: [],
	isFeatured: false,
});
