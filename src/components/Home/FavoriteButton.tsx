import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { Button } from "components/core";
import { api } from "utils/api";
import { useUser } from "@supabase/auth-helpers-react";

interface IProps {
  recipeId: string;
  className?: string;
}

function FavoriteButton({ recipeId, className }: IProps) {
  const utils = api.useContext();
  const user = useUser();
  const userFavorites = api.example.findFavoriteRecipesByUserId.useQuery({
    id: user?.id || "",
  });

  const createUserFavorite = api.example.createUserFavorite.useMutation();
  const deleteUserFavorite = api.example.deleteUserFavorite.useMutation();

  const favoriteIds = userFavorites.data?.map((o) => o.recipeId) || [];
  const Icon = favoriteIds.includes(recipeId) ? HiHeart : HiOutlineHeart;

  const handleClick = () => {
    if (favoriteIds.includes(recipeId)) {
      deleteUserFavorite.mutate(
        { recipeId },
        {
          onSuccess: () =>
            void utils.example.findFavoriteRecipesByUserId.invalidate(),
        }
      );
    } else {
      createUserFavorite.mutate(
        { recipeId },
        {
          onSuccess: () =>
            void utils.example.findFavoriteRecipesByUserId.invalidate(),
        }
      );
    }
  };

  return (
    <Button className={className} onClick={handleClick}>
      <Icon className="text-2xl text-red-500" />
    </Button>
  );
}

export default FavoriteButton;
