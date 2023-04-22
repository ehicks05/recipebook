import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { Alert, Button } from "components/core";
import { api } from "utils/api";
import { useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const doToast = (isFavorite: boolean, errorMessage = "") => {
  const title = errorMessage
    ? `Unable to ${
        isFavorite ? "remove recipe from" : "add recipe to"
      } favorites`
    : `Recipe ${isFavorite ? "removed from" : "added to"} favorites`;
  toast.custom((t) => (
    <Alert
      variant={errorMessage ? "error" : "success"}
      title={title}
      description={errorMessage}
      className={t.visible ? "animate-enter" : "animate-leave"}
    />
  ));
};

interface Props {
  recipeId: string;
  className?: string;
}

const FavoriteButton = ({ recipeId, className }: Props) => {
  const user = useUser();
  const userId = user?.id || "";
  const utils = api.useContext();

  const { data: userFavorites } =
    api.example.findFavoriteRecipesByUserId.useQuery({ id: userId });
  const isFavorite =
    (userFavorites?.map((o) => o.recipeId) || []).includes(recipeId) || false;

  const createUserFavorite = api.example.createUserFavorite.useMutation();
  const deleteUserFavorite = api.example.deleteUserFavorite.useMutation();
  const toggle = isFavorite ? deleteUserFavorite : createUserFavorite;
  const Icon = isFavorite ? HiHeart : HiOutlineHeart;

  const handleClick = () => {
    toggle.mutate(
      { recipeId },
      {
        onSettled: (_, err) => {
          if (!err) {
            const updated = isFavorite
              ? userFavorites?.filter((f) => f.recipeId !== recipeId)
              : [...(userFavorites || []), { userId, recipeId, recipe: }];
            utils.example.findFavoriteRecipesByUserId.setData(
              { id: userId },
              updated
            );
          }
          doToast(isFavorite, err?.message);
        },
      }
    );
  };

  return (
    <Button
      className={className}
      disabled={toggle.isLoading}
      onClick={handleClick}
    >
      <Icon className="text-xl text-red-500" />
    </Button>
  );
};

export default FavoriteButton;
