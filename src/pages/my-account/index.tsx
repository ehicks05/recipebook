import React, { useState } from "react";
import { Button, Container, Hero, Loading, MyInput, T } from "components/core";
import RecipeList from "components/MyAccount/RecipeList";
import { useUser } from "@supabase/auth-helpers-react";
import { api } from "utils/api";

const MyLists = () => {
  const user = useUser();
  if (!user) {
    return null;
  }
  const id = user.id;

  const authoredRecipes = api.example.findRecipesByAuthorId.useQuery({
    id,
  }).data;
  const favoriteRecipes = api.example.findFavoriteRecipesByUserId
    .useQuery({
      id,
    })
    .data?.map((o) => o.recipe);

  return (
    <Container>
      <T className="text-xl">My Lists</T>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <RecipeList recipes={authoredRecipes} title="My Recipes" />
        <RecipeList recipes={favoriteRecipes} title="My Favorites" />
      </div>
    </Container>
  );
};

const UserForm = () => {
  const user = useUser();
  const utils = api.useContext();

  const appUser = api.example.findAppUser.useQuery().data;
  const updateAppUser = api.example.updateAppUser.useMutation({
    onSuccess: async () => {
      await utils.example.findAppUser.invalidate();
    },
  });

  const [displayName, setDisplayName] = useState(appUser?.displayName || "");

  const handleSubmit = () => {
    updateAppUser.mutate({ displayName });
  };

  return (
    <Container>
      {user && (
        <div className="flex flex-col gap-4">
          <T className="text-xl">User Details</T>
          <MyInput disabled label="email" value={user.email} />
        </div>
      )}
      {appUser && (
        <div className="mt-8 flex w-full flex-col items-start gap-4">
          <T className="text-xl">AppUser Details</T>
          <MyInput disabled label="id" value={appUser.id} />
          <MyInput
            label="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <MyInput
            disabled
            label="createdAt"
            value={appUser.createdAt.toLocaleString()}
          />
          <MyInput
            disabled
            label="updatedAt"
            value={appUser.updatedAt.toLocaleString()}
          />
          <Button
            disabled={updateAppUser.isLoading}
            loading={updateAppUser.isLoading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      )}
    </Container>
  );
};

const MyAccount = () => {
  const user = useUser();
  if (!user) {
    return null;
  }
  const appUser = api.example.findAppUser.useQuery().data;

  if (!user || !appUser) return <Loading />;

  return (
    <>
      <Hero title="Profile" subtitle={appUser.displayName || ""} />
      <UserForm />
      <MyLists />
    </>
  );
};

export default MyAccount;
