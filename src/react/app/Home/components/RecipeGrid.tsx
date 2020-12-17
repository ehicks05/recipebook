import React from 'react';
import { IRecipe } from '../../../types/types';
import RecipeCard from './RecipeCard';

interface IProps {
  recipes: IRecipe[];
}

function RecipeGrid(props: IProps) {
  const recipeGrid = props.recipes.map(recipe => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));
  return <div className="columns is-variable is-2 is-multiline">{recipeGrid}</div>;
}

export default RecipeGrid;
