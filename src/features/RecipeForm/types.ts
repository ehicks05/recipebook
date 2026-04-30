import type { Ingredient, Recipe, Step } from '@/instant.types';

export type FormIngredient = Omit<Ingredient, 'id' | 'recipeId'>;
export type FormStep = Step;
export type FormRecipe = Omit<
	Recipe,
	| 'id'
	| 'createdAt'
	| 'updatedAt'
	| 'image'
	| 'isFeatured'
	| 'ingredients'
	| 'steps'
	| 'author'
	| 'favoritedBy'
> & {
	ingredients: FormIngredient[];
	steps: FormStep[];
};
