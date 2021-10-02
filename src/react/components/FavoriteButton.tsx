import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/all';

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

  return (
    <div>
      <IconContext.Provider
        value={{ size: '1.3em', color: '#E00', className: 'grow' }}
      >
        {recipeId && favoriteIds.includes(recipeId) ? (
          <BsHeartFill onClick={removeFavorite} />
        ) : (
          <BsHeart onClick={saveFavorite} />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default FavoriteButton;
