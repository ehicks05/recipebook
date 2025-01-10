// This is the recipeWithIncludes shape, with a where clause that filters so
// users only see their own favorites.
export const recipeIncludes = (userId: string | null) => {
	return {
		include: {
			author: true,
			directions: true,
			ingredients: true,
			userFavorites: {
				where: { userId: userId || undefined },
				select: { userId: true },
			},
		},
	};
};

export const recipeIncludesLite = (userId: string | null) => {
	return {
		include: {
			author: true,
			userFavorites: {
				where: { userId: userId || undefined },
				select: { userId: true },
			},
		},
	};
};
