import { z } from 'zod';
import { validateQuantity } from './utils';

const IngredientSchema = z.object({
	name: z.string().min(1),
	quantity: z.string().refine(validateQuantity, {
		message: 'Must be a valid quantity like 1 3/4',
	}),
	unit: z.string().nullable(),
});

const DirectionSchema = z.object({
	index: z.number(),
	text: z.string().min(1),
});

export const RecipeSchema = z.object({
	name: z.string().min(1).max(40),
	description: z.string().min(1),
	cookingTime: z.string().min(1),
	servings: z.number().min(1),
	emoji: z.string().min(1, 'Pick an emoji').max(3),
	difficulty: z.coerce.number(),
	isPublished: z.boolean(),
	source: z.string().nullable(),
	ingredients: IngredientSchema.array().min(1),
	directions: DirectionSchema.array().min(1),
});
