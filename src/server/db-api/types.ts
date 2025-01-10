import { Prisma } from '@prisma/client';

// Get type of recipe with includes added
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const completeRecipe = Prisma.validator<Prisma.recipeDefaultArgs>()({
	include: {
		author: true,
		directions: true,
		ingredients: true,
		userFavorites: {
			select: { userId: true },
		},
	},
});
export type CompleteRecipe = Prisma.recipeGetPayload<typeof completeRecipe>;
