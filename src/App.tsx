import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeLoader from './react/app/Recipe/RecipeLoader';
import Footer from './react/components/Footer';
import { IRecipe, IUser } from './react/types/types';
import MyAccount from './react/app/MyAccount/MyAccount';
import Home from './react/app/Home/Home';
import RecipeForm from './react/app/RecipeForm/RecipeForm';
import authFetch from './react/authFetch';
import { UserContext } from './react/UserContext';
import UserAccess from './react/app/Login/UserAccess';
import { setDefaultDescription, sortDirections } from './utils';
import Hero from './react/components/Hero';
import Loading from './react/components/Loading';
import Nav from './react/components/Navbar/Nav';

const App = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const fetchUser = useCallback(() => {
    authFetch('/me').then(json => {
      if (json) setUser(json);
    });
  }, []);

  const fetchRecipes = async () => {
    authFetch('/recipe').then(json => {
      setRecipes(
        json ? json.map(setDefaultDescription).map(sortDirections) : []
      );
    });
  };

  function fetchFavoriteIds() {
    authFetch('/recipe/favoriteIds').then(json => setFavoriteIds(json));
  }

  useEffect(() => {
    fetchRecipes();
    fetchUser();
    fetchFavoriteIds();
  }, []);

  useEffect(() => {
    fetchFavoriteIds();
  }, [user]);

  const isLoading =
    !recipes ||
    recipes?.length === 0 ||
    (user && (!favoriteIds || favoriteIds?.length === 0));

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        favoriteIds,
        setFavoriteIds,
        fetchFavoriteIds,
      }}
    >
      <div className="h-screen flex flex-col">
        <Nav />

        {isLoading ? (
          <>
            <Hero title="Loading" subtitle="Please wait..." />
            <div className="flex-grow flex items-center justify-center">
              <Loading />
            </div>
          </>
        ) : (
          <Switch>
            <Route exact path="/">
              <Home recipes={recipes} />
            </Route>
            <Route exact path="/recipe/:id">
              <RecipeLoader recipes={recipes} />
            </Route>
            <Route exact path="/edit-recipe/:id">
              <RecipeForm fetchRecipes={fetchRecipes} recipes={recipes} />
            </Route>
            <Route exact path="/create-recipe">
              <RecipeForm fetchRecipes={fetchRecipes} />
            </Route>
            <Route exact path="/my-account">
              <MyAccount />
            </Route>
            <Route exact path="/blog">
              <div>there is no blog, lol</div>
            </Route>
            <Route exact path="/login">
              <UserAccess />
            </Route>
          </Switch>
        )}

        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
