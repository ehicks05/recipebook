import React from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../../components/Hero';
import { IRecipe } from '../../types/types';
import Recipe from './Recipe';

interface IProps {
  recipes: IRecipe[];
}

const RecipeLoader = ({ recipes }: IProps) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(item => item?.id === id);

  if (!recipe) return <Hero title="Loading..." />;

  return <Recipe recipe={recipe} />;
};

export default RecipeLoader;
