import { RecipeCardLandscape } from 'components/Home/RecipeCard';
import { T } from 'components/core';
import React from 'react';
import type { CompleteRecipe } from 'server/api/routers/example';

interface Props {
	title: string;
	recipes: CompleteRecipe[] | undefined;
}

const RecipeList = ({ title, recipes }: Props) => {
	return (
		<div className="flex flex-col gap-4">
			<T className="text-center text-lg font-semibold">{title}</T>
			<div className="flex flex-col gap-4">
				{recipes?.map((recipe) => (
					<RecipeCardLandscape key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default RecipeList;
