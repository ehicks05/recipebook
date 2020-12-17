import React, { useState } from 'react';
import { BiHeart, BsFillHeartFill } from 'react-icons/all';

import { IconContext } from 'react-icons';
import authFetch from '../authFetch';

interface IProps {
  recipeId: number | undefined;
  favoriteIds: number[];
  fetchFavorites: () => void;
}

function FavoriteButton({ recipeId, favoriteIds, fetchFavorites }: IProps) {
  const [size, setSize] = useState<string>('1em');

  console.log(favoriteIds);

  function iconHover(e: React.MouseEvent) {
    setSize('1.3em');
  }

  function iconLeaveHover(e: React.MouseEvent) {
    setSize('1em');
  }

  function saveFavorite() {
    authFetch(`/recipe/favorite/${recipeId}`, {
      method: 'POST',
    }).then(json => {
      console.log(json);
      console.log('saved favorite');
      fetchFavorites();
    });
  }

  function removeFavorite() {
    authFetch(`/recipe/favorite/${recipeId}`, {
      method: 'DELETE',
    }).then(json => {
      fetchFavorites();
    });
  }

  return (
    <div>
      <IconContext.Provider value={{ size }}>
        {recipeId && favoriteIds.includes(recipeId) ? (
          <BsFillHeartFill
            onMouseEnter={iconHover}
            onMouseLeave={iconLeaveHover}
            onClick={removeFavorite}
          />
        ) : (
          <BiHeart
            onMouseEnter={iconHover}
            onMouseLeave={iconLeaveHover}
            onClick={saveFavorite}
          />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default FavoriteButton;
