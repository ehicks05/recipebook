import type { FormDirection, FormIngredient, FormRecipe } from './types';

export const UNITS = ['tsp', 'tbsp', 'oz', 'cup', 'lb', 'ml', 'L', 'g'];

export const DEFAULT_INGREDIENT: FormIngredient = {
	name: '',
	quantity: '',
	unit: '',
};
export const DEFAULT_DIRECTION: FormDirection = {
	index: 0,
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
	directions: [{ index: 0, text: '' }],
};
