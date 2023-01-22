import React from "react";
import { Container, Hero, T } from "components/core";
import MyAccountComponent from "components/MyAccount/MyAccountComponent";
import { useUser } from "@supabase/auth-helpers-react";
import { api } from "utils/api";

function MyAccount() {
  const user = useUser();

  const authoredRecipes = api.example.findRecipesByAuthorId.useQuery({
    id: user?.id || "",
  }).data;
  const userFavorites = api.example.findFavoriteRecipesByUserId.useQuery({
    id: user?.id || "",
  });
  const favoriteRecipes = userFavorites.data?.map((o) => o.recipe);

  return (
    <>
      <Hero title="Your Profile" subtitle={user?.email} />
      <Container>
        <T>User Info Dump: </T>
        <T className="whitespace-pre">{JSON.stringify(user, null, 2)}</T>
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MyAccountComponent recipes={authoredRecipes} title="My Recipes" />
          <MyAccountComponent recipes={favoriteRecipes} title="My Favorites" />
          <MyAccountComponent recipes={[]} title="My Lists" />
        </div>
      </Container>
    </>
  );
}

export default MyAccount;
