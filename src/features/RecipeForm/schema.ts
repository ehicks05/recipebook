import { z } from 'zod';
import { validateQuantity } from './lib/utils';

const Ingredient = z.object({
	name: z.string().min(1, { error: 'Add ingredient name' }),
	quantity: z
		.string()
		.refine(validateQuantity, { message: 'Quantity must be fraction or decimal' })
		.optional(),
	unit: z.string().optional(),
});

const Step = z.object({ text: z.string().min(1, { error: 'Add a description' }) });

export const RecipeSchema = z.object({
	name: z.string().min(1, { error: 'Add a name' }).max(40, { error: 'Too long' }),
	description: z.string().min(1, { error: 'Add a description' }),
	source: z.string(),
	cookingTime: z.string().min(1, { error: 'Add a time' }),
	servings: z.number({ error: 'Add servings' }).min(1, { error: 'Add servings' }),
	emoji: z.string().min(1, 'Pick an emoji').max(3),
	isPublished: z.boolean(),

	ingredients: Ingredient.array().min(1),
	steps: Step.array().min(1),
});

export const RecipeUpdateSchema = RecipeSchema.extend({ id: z.string() });

export type RecipeCreate = z.infer<typeof RecipeSchema>;
export type RecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
