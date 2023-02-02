import React from "react";
import { Container, Hero, MyInput, T } from "components/core";
import RecipeList from "components/MyAccount/RecipeList";
import { useUser } from "@supabase/auth-helpers-react";
import { api } from "utils/api";

const MyAccount = () => {
  const user = useUser();
  if (!user) {
    return null;
  }
  const id = user.id;

  const authoredRecipes = api.example.findRecipesByAuthorId.useQuery({
    id,
  }).data;
  const userFavorites = api.example.findFavoriteRecipesByUserId.useQuery({
    id,
  }).data;
  const favoriteRecipes = userFavorites?.map((o) => o.recipe);

  return (
    <>
      <Hero title="Your Profile" subtitle={user?.email} />
      <Container>
        <div className="flex flex-col gap-4">
          <T className="text-xl">User Details</T>
          <MyInput disabled label="email" value={user.email} />
          {/* <T className="whitespace-pre">{JSON.stringify(user, null, 2)}</T> */}
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          <RecipeList recipes={authoredRecipes} title="My Recipes" />
          <RecipeList recipes={favoriteRecipes} title="My Favorites" />
        </div>
      </Container>
    </>
  );
};

export default MyAccount;
