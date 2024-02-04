'use client';

import { Loading } from 'components/core';
import React from 'react';
import { api } from 'utils/api';
import RecipeCard from './RecipeCard';

const RecipeOfTheDay = () => {
	const {
		isLoading,
		error,
		data: recipe,
	} = api.example.getRecipeOfTheDay.useQuery();

	if (isLoading) return <Loading />;
	if (error || !recipe) return <div>{error?.message || 'Something went wrong'}</div>;

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<RecipeCard key={recipe.id} recipe={recipe} />
			</div>
		</div>
	);
};

export default RecipeOfTheDay;
