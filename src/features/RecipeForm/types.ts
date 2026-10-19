import type { Ingredient, Step } from '@/functions/recipes.functions';
import type { RecipeInsert } from '@/functions/recipes.server';

export type FormIngredient = Ingredient;
export type FormStep = Step;
export type FormRecipe = Omit<
	RecipeInsert,
	'id' | 'createdAt' | 'updatedAt' | 'isFeatured' | 'authorId'
>;
