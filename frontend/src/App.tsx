import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from 'components/Footer';
import Nav from 'components/Nav/Nav';
import RecipeForm from 'app/RecipeForm/RecipeForm';
import Home from 'app/Home/Home';
import MyAccount from 'app/MyAccount/MyAccount';
import RecipePage from 'app/Recipe/RecipePage';
import RecipeImport from 'app/RecipeImport';

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="edit-recipe/:id" element={<RecipeForm />} />
        <Route path="create-recipe" element={<RecipeForm />} />
        <Route path="my-account" element={<MyAccount />} />
        <Route path="recipe-import" element={<RecipeImport />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
