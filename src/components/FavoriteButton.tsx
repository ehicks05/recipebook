import React, { useMemo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { IconContext } from 'react-icons';
import authFetch from '../authFetch';

interface IProps {
  recipeId: number | undefined;
  favoriteIds: number[];
  fetchFavorites: () => void;
}

function FavoriteButton({ recipeId, favoriteIds, fetchFavorites }: IProps) {
  const saveFavorite = () => {
    authFetch(`/recipe/favorite/${recipeId}`, {
      method: 'POST',
    }).then(() => {
      fetchFavorites();
    });
  };

  const removeFavorite = () => {
    authFetch(`/recipe/favorite/${recipeId}`, {
      method: 'DELETE',
    }).then(() => {
      fetchFavorites();
    });
  };

  const style = useMemo(() => ({ size: '1.3em', color: '#E00' }), []);

  return (
    <div>
      <IconContext.Provider value={style}>
        {recipeId && favoriteIds.includes(recipeId) ? (
          <FaHeart onClick={removeFavorite} />
        ) : (
          <FaRegHeart onClick={saveFavorite} />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default FavoriteButton;
