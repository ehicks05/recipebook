import React from 'react';
import { NavLink } from 'react-router-dom';
import { IRecipe } from '../../../types/types';

interface IRecipeListProps {
  recipes: IRecipe[];
}

function RecipeList(props: IRecipeListProps) {
  const recipeList = props.recipes.map(recipe => (
    <RecipeLink key={recipe.id} recipe={recipe} />
  ));
  return <ul>{recipeList}</ul>;
}

interface IRecipeLinkProps {
  recipe: IRecipe;
}

function RecipeLink(props: IRecipeLinkProps) {
  const { recipe } = props;
  return (
    <li>
      <NavLink to={`/recipe/${recipe.id}`} activeClassName="is-active">
        <span className="panel-icon">
          <span className="" aria-hidden="true">
            {recipe.emoji}
          </span>
        </span>
        {recipe.name}
      </NavLink>
    </li>
  );
}

export default RecipeList;
