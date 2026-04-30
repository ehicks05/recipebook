import { T } from '@/components/core';
import type { Recipe } from '@/instant.types';
import SmallRecipeCard from './SmallRecipeCard';

interface Props {
	title: string;
	recipes?: Recipe[];
}

const RecipeList = ({ title, recipes }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<T className="text-center text-lg font-semibold">{title}</T>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
				{recipes?.map((recipe) => (
					<SmallRecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default RecipeList;
