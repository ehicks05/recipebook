import type { Direction, Ingredient, RecipeFull } from 'trpc/types';

export type FormIngredient = Omit<Ingredient, 'id' | 'recipeId'>;
export type FormDirection = Omit<Direction, 'id' | 'recipeId'>;
export type FormRecipe = Omit<
	RecipeFull,
	| 'id'
	| 'authorId'
	| 'createdAt'
	| 'updatedAt'
	| 'imageSrc'
	| 'isFeatured'
	| 'ingredients'
	| 'directions'
	| 'author'
	| 'userFavorites'
	| '_count'
> & {
	ingredients: FormIngredient[];
	directions: FormDirection[];
};
