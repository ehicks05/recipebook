"use client";

import React, { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button, Loading, MyInput, T } from "components/core";
import RecipeCard from "./RecipeCard";
import { api } from "utils/api";
import type { CompleteRecipe } from "server/api/routers/example";

interface Props {
  recipes: CompleteRecipe[];
}

function RecipePicker({ recipes }: Props) {
  const [parent] = useAutoAnimate();
  const [filterInput, setFilterInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients
      .map((x) => x.name.toLowerCase())
      .join();
    return ingredients.every((recipeFilter) =>
      recipeIngredients.includes(recipeFilter)
    );
  });

  const handleAddFilter = () => {
    if (!ingredients.includes(filterInput)) {
      setIngredients([...ingredients, filterInput.toLowerCase()]);
      setFilterInput("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <MyInput
          className="bg-neutral-100 px-2 py-1.5 dark:bg-neutral-800 dark:text-neutral-200"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value.toLowerCase())}
          onKeyUp={(e) => e.key === "Enter" && handleAddFilter()}
          placeholder="Search by Ingredient"
        />
        {ingredients.length > 0 && (
          <Button className="ml-2" onClick={() => setIngredients([])}>
            Clear
          </Button>
        )}
      </div>
      {ingredients.length > 0 && (
        <div className="flex gap-2" ref={parent}>
          {ingredients.map((ingredient) => (
            <Button
              key={ingredient}
              className="text-xs"
              onClick={() =>
                setIngredients(ingredients.filter((i) => i !== ingredient))
              }
            >
              {ingredient}
            </Button>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {filteredRecipes.length === 0 && <T>No results...</T>}
      </div>
    </div>
  );
}

const RecipePickerWrapper = () => {
  const {
    isLoading,
    error,
    data: recipes,
  } = api.example.findRecipes.useQuery();

    const {
    data: recipeOfTheDay,
  } = api.example.getRecipeOfTheDay.useQuery();

  if (isLoading) return <Loading />;
  if (error || !recipes)
    return <div>{error?.message || "Something went wrong"}</div>;

  return <RecipePicker recipes={recipes.sort((o1, o2) => o1.id === recipeOfTheDay?.id ? -1 : o2.id === recipeOfTheDay?.id ? 1 : 0)} />;
};

export default RecipePickerWrapper;
