import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import Recipe from './react/app/Recipe/Recipe';
import Navbar from './react/components/Navbar/Navbar';
import Footer from './react/components/Footer';
import { IRecipe, IUser } from './react/types/types';
import MyAccount from './react/app/MyAccount/MyAccount';
import Home from './react/app/Home/Home';
import RecipeForm from './react/app/RecipeForm/RecipeForm';
import authFetch from './react/authFetch';
import { UserContext } from './react/UserContext';
import UserAccess from './react/app/Login/UserAccess';
import { setDefaultDescription, setDefaultAuthor } from './utils';
import Loading from './react/components/Loading';
import backupRecipes from './recipes.json';

export default function App() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [fetchError, setFetchError] = useState<any | undefined>(undefined);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const fetchUser = useCallback(() => {
    authFetch('/me').then(json => {
      if (json) setUser(json);
    });
  }, [setUser]);

  const fetchRecipes = async () => {
    try {
      const recipes = await authFetch('/recipe');
      if (!recipes) throw new Error('data error');
      setRecipes(recipes ? recipes.map(setDefaultDescription) : []);
    } catch (e) {
      setFetchError(e);
      setRecipes(
        (backupRecipes as any).map(setDefaultDescription).map(setDefaultAuthor),
      );
    }
  };

  function fetchFavoriteIds() {
    authFetch('/recipe/favoriteIds').then(json => setFavoriteIds(json));
  }

  useEffect(() => {
    fetchRecipes();
    fetchUser();
    fetchFavoriteIds();
  }, [fetchUser]);

  useEffect(() => {
    fetchFavoriteIds();
  }, [user]);

  if (!recipes || (user && !favoriteIds))
    return <Loading title="Loading..." subtitle="Please wait..." />;

  return (
    <UserContext.Provider
      value={{ user, setUser, favoriteIds, setFavoriteIds, fetchFavoriteIds }}
    >
      {fetchError && <ErrorBar />}
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home recipes={recipes} />
        </Route>
        <Route exact path="/recipe/:id">
          <Recipe recipes={recipes} />
        </Route>
        <Route exact path="/edit-recipe/:id">
          <RecipeForm fetchRecipes={fetchRecipes} recipes={recipes} />
        </Route>
        <Route exact path="/create-recipe">
          <RecipeForm fetchRecipes={fetchRecipes} />
        </Route>
        <Route exact path="/myAccount">
          <MyAccount />
        </Route>
        <Route exact path="/login">
          <UserAccess />
        </Route>
      </Switch>

      <Footer />
    </UserContext.Provider>
  );
}

const ErrorBar = () => (
  <div
    style={{
      padding: '0.5rem 1rem',
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 1000,
    }}
    className="has-text-white has-background-danger"
  >
    <div className="container">
      Unable to fetch recipes, showing default recipes instead
    </div>
  </div>
);
