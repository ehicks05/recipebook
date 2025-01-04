export const getCompleteRecipeInclude = (userId: string | null) => {
	return {
		include: {
			author: true,
			directions: true,
			ingredients: true,
			featuredRecipe: true,
			userFavorites: {
				where: { userId: userId || undefined },
				select: { userId: true },
			},
		},
	};
};
