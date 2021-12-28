import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
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

  const fetchFavoriteIds = useCallback(() => {
    authFetch('/recipe/favoriteIds').then(json => setFavoriteIds(json));
  }, []);

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

  const context = useMemo(
    () => ({
      user,
      setUser,
      favoriteIds,
      setFavoriteIds,
      fetchFavoriteIds,
    }),
    [user, favoriteIds]
  );

  return (
    <UserContext.Provider value={context}>
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
          <Routes>
            <Route path="/" element={<Home recipes={recipes} />} />
            <Route
              path="recipe/:id"
              element={<RecipeLoader recipes={recipes} />}
            />
            <Route
              path="edit-recipe/:id"
              element={
                <RecipeForm fetchRecipes={fetchRecipes} recipes={recipes} />
              }
            />
            <Route
              path="create-recipe"
              element={<RecipeForm fetchRecipes={fetchRecipes} />}
            />
            <Route path="my-account" element={<MyAccount />} />
            <Route path="blog" element={<div>there is no blog, lol</div>} />
            <Route path="login" element={<UserAccess />} />
          </Routes>
        )}

        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
