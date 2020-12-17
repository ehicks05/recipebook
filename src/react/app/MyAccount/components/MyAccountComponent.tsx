import React from 'react';
import SmallRecipeCard from './SmallRecipeCard';
import { IRecipe } from '../../../types/types';

interface IMyAccountComponentType {
  recipes: IRecipe[] | undefined;
  title: string;
}

function MyAccountComponent(props: IMyAccountComponentType) {
  return (
    <>
      <p className="has-text-centered">{props.title}</p>
      {props.recipes?.map(it => (
        <SmallRecipeCard key={it.id} recipe={it} />
      ))}
    </>
  );
}

export default MyAccountComponent;
