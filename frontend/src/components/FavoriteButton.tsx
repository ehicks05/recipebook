import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { IconContext } from 'react-icons';
import {
  useAddFavorite,
  useFetchFavorites,
  useRemoveFavorite,
} from 'hooks/favorites';

interface IProps {
  recipeId?: string;
}

const style = { size: '1.3em', color: '#E00' };

function FavoriteButton({ recipeId }: IProps) {
  const userFavorites = useFetchFavorites();
  const addFavorite = useAddFavorite(recipeId || '');
  const removeFavorite = useRemoveFavorite(recipeId || '');

  const favoriteIds = userFavorites.data?.map(f => f.id) || [];

  return (
    <div>
      <IconContext.Provider value={style}>
        {recipeId && favoriteIds.includes(recipeId) ? (
          <FaHeart onClick={() => removeFavorite.mutate} />
        ) : (
          <FaRegHeart onClick={() => addFavorite.mutate} />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default FavoriteButton;
