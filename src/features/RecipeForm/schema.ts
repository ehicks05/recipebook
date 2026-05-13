import { z } from 'zod';
import { validateQuantity } from './lib/utils';

const IngredientSchema = z.object({
	name: z.string().min(1, { error: 'Add ingredient name' }),
	quantity: z.string().refine(validateQuantity, {
		message: 'Example amounts: 2, 1.5, or 1 3/4',
	}),
	unit: z.string().optional(),
});
const Ingredients = z.object({ ingredients: IngredientSchema.array().min(1) });

const StepSchema = z.object({
	text: z.string().min(1, { error: 'Add a description' }),
});
const Steps = z.object({ steps: StepSchema.array().min(1) });

const BaseRecipeSchema = z.object({
	name: z.string().min(1, { error: 'Add a name' }).max(40, { error: 'Too long' }),
	description: z.string().min(1, { error: 'Add a description' }),
	cookingTime: z.string().min(1, { error: 'Add a time' }),
	servings: z.number({ error: 'Add servings' }).min(1, { error: 'Add servings' }),
	emoji: z.string().min(1, 'Pick an emoji').max(3),
	isPublished: z.boolean(),
	source: z.string(),
});

export const RecipeSchema = BaseRecipeSchema.extend(Ingredients.shape).extend(
	Steps.shape,
);
export const RecipeUpdateSchema = RecipeSchema.extend({ id: z.string() });

export type RecipeCreate = z.infer<typeof RecipeSchema>;
export type RecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
