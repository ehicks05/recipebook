import React from 'react';
import SmallRecipeCard from './SmallRecipeCard';
import { IRecipe } from '../../../types/types';
import T from '../../../components/T';

interface IMyAccountComponentType {
  title: string;
  recipes: IRecipe[] | undefined;
}

function MyAccountComponent({ title, recipes }: IMyAccountComponentType) {
  return (
    <div>
      <T className="mb-4 text-lg font-semibold text-center">{title}</T>
      <div className="flex flex-col gap-4">
        {recipes?.map(recipe => (
          <SmallRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default MyAccountComponent;
