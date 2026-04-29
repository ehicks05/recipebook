import type { FormIngredient, FormRecipe, FormStep } from './types';

export const UNITS = ['tsp', 'tbsp', 'oz', 'cup', 'lb', 'ml', 'L', 'g'];

export const DEFAULT_INGREDIENT: FormIngredient = {
	name: '',
	quantity: '',
	unit: '',
};
export const DEFAULT_STEP: FormStep = {
	text: '',
};
export const DEFAULT_RECIPE: FormRecipe = {
	name: '',
	description: '',
	emoji: '\uD83E\uDD58',
	cookingTime: '',
	servings: 0,
	isPublished: true,
	source: null,
	ingredients: [{ name: '', quantity: '', unit: 'tsp' }],
	steps: [{ text: '' }],
};
