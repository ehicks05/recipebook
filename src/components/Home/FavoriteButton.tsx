import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

// import {
//   useAddFavorite,
//   useFetchFavorites,
//   useRemoveFavorite,
// } from 'hooks/favorites';
// import { Button } from 'components/core';

interface IProps {
  recipeId: string;
  className?: string;
}

function FavoriteButton({ recipeId, className }: IProps) {
  // const userFavorites = useFetchFavorites();
  // const addFavorite = useAddFavorite(recipeId);
  // const removeFavorite = useRemoveFavorite(recipeId);

  // const favoriteIds = userFavorites.data?.map(f => f.id) || [];

  // const Icon = favoriteIds.includes(recipeId) ? HiHeart : HiOutlineHeart;
  // const handler = favoriteIds.includes(recipeId)
  //   ? removeFavorite.mutate
  //   : addFavorite.mutate;

  // return (
  //   <Button className={className} onClick={() => handler()}>
  //     <Icon className="text-2xl text-red-500" />
  //   </Button>
  // );

  return <div>ok</div>;
}

export default FavoriteButton;
