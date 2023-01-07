import { useQuery } from 'react-query';
import authFetch from 'helpers/authFetch';
import { IRecipe } from 'types/types';

const useFetchRecipes = () => {
  const path = '/api/recipes';
  const fetch = async () => authFetch(path);

  return useQuery<IRecipe[], Error>(path, fetch);
};

const useFetchRecipe = (id: string) => {
  const path = `/api/recipes/${id}`;
  const fetch = async () => authFetch(path);

  return useQuery<IRecipe, Error>(path, fetch);
};

export { useFetchRecipes, useFetchRecipe };
