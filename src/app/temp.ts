export const getCompleteRecipeInclude = (userId: string | null) => {
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
