import React from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

import {
  useAddFavorite,
  useFetchFavorites,
  useRemoveFavorite,
} from 'hooks/favorites';
import { Button } from 'core-components';

interface IProps {
  recipeId: string;
}

function FavoriteButton({ recipeId }: IProps) {
  const userFavorites = useFetchFavorites();
  const addFavorite = useAddFavorite(recipeId);
  const removeFavorite = useRemoveFavorite(recipeId);

  const favoriteIds = userFavorites.data?.map(f => f.id) || [];

  const Icon = favoriteIds.includes(recipeId) ? HiHeart : HiOutlineHeart;
  const handler = favoriteIds.includes(recipeId)
    ? removeFavorite.mutate
    : addFavorite.mutate;

  return (
    <Button onClick={() => handler()}>
      <Icon className="text-2xl text-red-500" />
    </Button>
  );
}

export default FavoriteButton;
