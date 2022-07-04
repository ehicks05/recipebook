import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from 'components/Footer';
import { IRecipe } from 'types/types';
import authFetch from 'authFetch';
import { Hero, Loading, T } from 'core-components';
import Nav from 'components/Nav/Nav';
import RecipeForm from 'app/RecipeForm/RecipeForm';
import Home from 'app/Home/Home';
import MyAccount from 'app/MyAccount/MyAccount';
import RecipeLoader from 'app/Recipe/RecipeLoader';
import { useQuery } from 'react-query';

const App = () => {
  const recipesQuery = useQuery<IRecipe[], Error>('/api/recipes', () =>
    authFetch('/api/recipes')
  );

  return (
    <div className="h-screen flex flex-col">
      <Nav />

      {recipesQuery.isLoading ? (
        <>
          <Hero title="Loading" subtitle="Please wait..." />
          <div className="flex-grow flex items-center justify-center">
            <Loading />
          </div>
        </>
      ) : recipesQuery.isError || !recipesQuery.data ? (
        <>
          <Hero title="Loading" subtitle="Uh oh..." />
          <div className="flex-grow flex items-center justify-center">
            Something went wrong...
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home recipes={recipesQuery.data} />} />
          <Route
            path="recipe/:id"
            element={<RecipeLoader recipes={recipesQuery.data} />}
          />
          <Route
            path="edit-recipe/:id"
            element={<RecipeForm recipes={recipesQuery.data} />}
          />
          <Route path="create-recipe" element={<RecipeForm />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="blog" element={<T>Work in progress...</T>} />
        </Routes>
      )}

      <Footer />
    </div>
  );
};

export default App;
