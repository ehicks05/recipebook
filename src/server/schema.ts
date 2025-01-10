import { z } from 'zod';
import { validateQuantity } from './utils';

const IngredientSchema = z.object({
	name: z.string().min(1),
	quantity: z.string().refine(validateQuantity, {
		message: 'Must be a valid quantity like 1 3/4',
	}),
	unit: z.string().nullable(),
});
const Ingredients = z.object({ ingredients: IngredientSchema.array().min(1) });

const DirectionSchema = z.object({
	index: z.number(),
	text: z.string().min(1),
});
const Directions = z.object({ directions: DirectionSchema.array().min(1) });

const BaseRecipeSchema = z.object({
	name: z.string().min(1).max(40),
	description: z.string().min(1),
	cookingTime: z.string().min(1),
	servings: z.number().min(1),
	emoji: z.string().min(1, 'Pick an emoji').max(3),
	difficulty: z.coerce.number(),
	isPublished: z.boolean(),
	source: z.string().nullable(),
});

export const RecipeSchema = BaseRecipeSchema.merge(Ingredients).merge(Directions);
export const RecipeUpdateSchema = RecipeSchema.extend({ id: z.string() });

export type RecipeCreate = z.infer<typeof RecipeSchema>;
export type RecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
