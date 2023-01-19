import { useMutation, useQuery, useQueryClient } from 'react-query';
import authFetch from 'helpers/authFetch';
import { IFavorite } from 'types/types';

const useFetchFavorites = () => {
  const path = '/api/recipes/favorites';
  const fetch = async () => authFetch(path);

  return useQuery<IFavorite[], Error>(path, fetch);
};

const useAddFavorite = (id: string) => {
  const queryClient = useQueryClient();

  const path = `/api/recipes/favorites/${id}`;
  const fetch = async () => authFetch(path, { method: 'POST' });

  return useMutation<IFavorite, Error>(path, fetch, {
    onSuccess: () => queryClient.invalidateQueries('/api/recipes/favorites'),
  });
};

const useRemoveFavorite = (id: string) => {
  const queryClient = useQueryClient();

  const path = `/api/recipes/favorites/${id}`;
  const fetch = async () => authFetch(path, { method: 'DELETE' });

  return useMutation<IFavorite, Error>(path, fetch, {
    onSuccess: () => queryClient.invalidateQueries('/api/recipes/favorites'),
  });
};

export { useFetchFavorites, useAddFavorite, useRemoveFavorite };
