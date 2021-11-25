import React from 'react';
import SmallRecipeCard from './SmallRecipeCard';
import { IRecipe } from '../../../types/types';

interface IMyAccountComponentType {
  title: string;
  recipes: IRecipe[] | undefined;
}

function MyAccountComponent({ title, recipes }: IMyAccountComponentType) {
  return (
    <div>
      <p className="text-lg font-semibold has-text-centered">{title}</p>
      <div className="flex flex-col gap-4">
        {recipes?.map(recipe => (
          <SmallRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default MyAccountComponent;
