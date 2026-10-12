import type { Ingredient, NewRecipe, Step } from '@/functions/recipes';

export type FormIngredient = Ingredient;
export type FormStep = Step;
export type FormRecipe = Omit<
	NewRecipe,
	'id' | 'createdAt' | 'updatedAt' | 'isFeatured' | 'author' | 'authorId'
>;
