import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from 'components/Footer';
import { IRecipe } from 'types/types';
import authFetch from 'authFetch';
import Hero from 'components/Hero';
import Loading from 'components/Loading';
import Nav from 'components/Nav/Nav';
import T from 'components/T';
import { hydrateRecipes } from 'utils';
import RecipeForm from 'app/RecipeForm/RecipeForm';
import Home from 'app/Home/Home';
import MyAccount from 'app/MyAccount/MyAccount';
import RecipeLoader from 'app/Recipe/RecipeLoader';

const App = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const fetchRecipes = async () => {
    authFetch('/api/recipe').then(json => {
      setRecipes(json ? hydrateRecipes(json) : []);
    });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const isLoading = false;

  return (
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
          <Route path="blog" element={<T>there is no blog, lol</T>} />
        </Routes>
      )}

      <Footer />
    </div>
  );
};

export default App;
