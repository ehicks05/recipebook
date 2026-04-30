import { T } from '@/components/core';
import type { Recipe } from '@/instant.types';
import SmallRecipeCard from './SmallRecipeCard';

interface Props {
	title: string;
	recipes?: Recipe[];
}

const RecipeList = ({ title, recipes }: Props) => {
	return (
		<div className="flex flex-col gap-4">
			<T className="text-center text-lg font-semibold">{title}</T>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{recipes?.map((recipe) => (
					<SmallRecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default RecipeList;
