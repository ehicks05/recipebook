import React from 'react';
import SmallRecipeCard from './SmallRecipeCard';
import { IRecipe } from '../../../types/types';

interface IMyAccountComponentType {
  title: string;
  recipes: IRecipe[] | undefined;
}

function MyAccountComponent({ title, recipes }: IMyAccountComponentType) {
  return (
    <>
      <p className="title has-text-centered">{title}</p>
      {recipes?.map(it => (
        <SmallRecipeCard key={it.id} recipe={it} />
      ))}
    </>
  );
}

export default MyAccountComponent;
