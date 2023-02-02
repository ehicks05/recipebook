import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { Alert, Button } from "components/core";
import { api } from "utils/api";
import { useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

interface Props {
  recipeId: string;
  className?: string;
}

const FavoriteButton = ({ recipeId, className }: Props) => {
  const user = useUser();
  const id = user?.id || "";

  const { data: userFavorites, refetch: refetchUserFavorites } =
    api.example.findFavoriteRecipesByUserId.useQuery({ id });

  const createUserFavorite = api.example.createUserFavorite.useMutation();
  const deleteUserFavorite = api.example.deleteUserFavorite.useMutation();

  const favoriteIds = userFavorites?.map((o) => o.recipeId) || [];
  const isFavorite = favoriteIds.includes(recipeId);
  const Icon = isFavorite ? HiHeart : HiOutlineHeart;

  const handleClick = () => {
    if (isFavorite) {
      deleteUserFavorite.mutate(
        { recipeId },
        {
          onSuccess: () => {
            void refetchUserFavorites();
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
            void refetchUserFavorites();
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
};

export default FavoriteButton;
