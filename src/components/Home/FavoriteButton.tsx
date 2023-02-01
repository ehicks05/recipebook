import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { Alert, Button } from "components/core";
import { api } from "utils/api";
import { useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

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
  const isFavorite = favoriteIds.includes(recipeId);
  const Icon = isFavorite ? HiHeart : HiOutlineHeart;

  const handleClick = () => {
    if (isFavorite) {
      deleteUserFavorite.mutate(
        { recipeId },
        {
          onSuccess: () => {
            void utils.example.findFavoriteRecipesByUserId.invalidate();
            toast.custom((t) => (
              <Alert
                variant="success"
                title={`Recipe removed from favorites!`}
                className={t.visible ? "animate-enter" : "animate-leave"}
              />
            ));
          },
        }
      );
    } else {
      createUserFavorite.mutate(
        { recipeId },
        {
          onSuccess: () => {
            void utils.example.findFavoriteRecipesByUserId.invalidate();
            toast.custom((t) => (
              <Alert
                variant="success"
                title={`Recipe added to favorites!`}
                className={t.visible ? "animate-enter" : "animate-leave"}
              />
            ));
          },
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
