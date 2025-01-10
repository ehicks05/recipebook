import { RecipeCardLandscape } from 'components/Home/RecipeCard';
import { T } from 'components/core';
import React from 'react';
import type { Recipe } from 'trpc/types';

interface Props {
	title: string;
	recipes?: Recipe[];
}

const RecipeList = ({ title, recipes }: Props) => {
	return (
		<div className="flex flex-col gap-4">
			<T className="text-center text-lg font-semibold">{title}</T>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{recipes?.map((recipe) => (
					<RecipeCardLandscape key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default RecipeList;
