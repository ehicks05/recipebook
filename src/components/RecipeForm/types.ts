import type { Direction, Ingredient, Recipe } from 'server/db-api';

export type FormIngredient = Omit<Ingredient, 'id' | 'recipeId'>;
export type FormDirection = Omit<Direction, 'id' | 'recipeId'>;
export type FormRecipe = Omit<
	Recipe,
	'id' | 'authorId' | 'createdAt' | 'updatedAt' | 'imageSrc' | 'isFeatured'
> & {
	ingredients: FormIngredient[];
	directions: FormDirection[];
};
