import React, { useEffect, useState } from "react";
import Recipe from "./react/app/Recipe/Recipe";
import Navbar from "./react/components/Navbar/Navbar";
import Footer from "./react/components/Footer";
import { Route } from "react-router-dom";
import { IUser } from "./react/types/types";
import MyAccount from "./react/app/MyAccount/MyAccount";
import Home from "./react/app/Home/Home";
import RecipeForm from "./react/app/RecipeForm/RecipeForm";
import apiUrl from "./react/apiUrl";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    fetchRecipes();
  }, []);

  function fetchRecipes() {
    fetch(apiUrl + "/recipe")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
      });
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Route exact path="/">
        <Home recipes={recipes} />
      </Route>
      <Route path="/recipe/:id">
        <Recipe recipes={recipes} />
      </Route>
      <Route path="/create-recipe">
        <RecipeForm fetchRecipes={fetchRecipes} />
      </Route>
      <Route path="/myAccount">
        <MyAccount user={user} />
      </Route>

      <Footer />
    </>
  );
}
