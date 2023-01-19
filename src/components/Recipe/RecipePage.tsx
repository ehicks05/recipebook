import React from "react";
import { Hero } from "components/core";
// import { useFetchRecipe } from "hooks/recipes";
import Recipe from "./Recipe";

const RecipePage = ({ id }: { id: string }) => {
  // const { isLoading, isError, error, data: recipe } = useFetchRecipe(id || "");

  // if (isLoading) return <Hero title="Loading..." />;
  // if (isError) return <Hero title="Error..." subtitle={error.message} />;
  // if (!recipe) return <Hero title="Recipe not found" />;
  return <div>sup</div>;
  // return <Recipe recipe={recipe} />;
};

export default RecipePage;
