import React from 'react';
import { useParams } from 'react-router-dom';
import { Hero } from 'core-components';
import { useFetchRecipe } from 'hooks/recipes';
import Recipe from './Recipe';

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, error, data: recipe } = useFetchRecipe(id || '');

  if (isLoading) return <Hero title="Loading..." />;
  if (isError) return <Hero title="Error..." subtitle={error.message} />;
  if (!recipe) return <Hero title="Recipe not found" />;

  return <Recipe recipe={recipe} />;
};

export default RecipePage;
