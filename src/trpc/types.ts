import type { RouterOutputs } from './react';

export type Recipe = RouterOutputs['example']['findRecipes'][number];

export type RecipeFull = NonNullable<RouterOutputs['example']['findRecipe']>;
export type Direction = RecipeFull['directions'][number];
export type Ingredient = RecipeFull['ingredients'][number];
