"use client";

import React, { useState } from "react";
import { Button, Loading, MyInput, T, Toggle } from "components/core";
import RecipeCard, { RecipeCardLandscape, RecipeCardOld } from "./RecipeCard";
import { api } from "utils/api";
import type { CompleteRecipe } from "server/api/routers/example";
import { useUser } from "@supabase/auth-helpers-react";

interface Props {
  recipes: CompleteRecipe[];
}

function RecipePicker({ recipes }: Props) {
  const user = useUser();
  const [filterInput, setFilterInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newCard, setNewCard] = useState(false);
  const [layout, setLayout] = useState("portrait");

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
        <div className="flex gap-2">
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

      {user && (
        <div className="flex flex-col gap-2 rounded bg-slate-200 p-4 dark:bg-slate-800">
          <T className="">Experiments:</T>
          <Toggle
            id="newCard"
            checked={newCard}
            onChange={() => setNewCard(!newCard)}
            label="New Card UI"
          />
          <Toggle
            id="layoutMode"
            disabled={!newCard}
            checked={layout === "landscape"}
            onChange={() =>
              setLayout(layout === "landscape" ? "portrait" : "landscape")
            }
            label="Landscape Layout"
          />
        </div>
      )}
      {!newCard && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCardOld key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && <T>No results...</T>}
        </div>
      )}
      {newCard && layout === "landscape" && (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCardLandscape key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && <T>No results...</T>}
        </div>
      )}
      {newCard && layout === "portrait" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && <T>No results...</T>}
        </div>
      )}
    </div>
  );
}

const RecipePickerWrapper = () => {
  const {
    isLoading,
    error,
    data: recipes,
  } = api.example.findRecipes.useQuery();

  if (isLoading) return <Loading />;
  if (error || !recipes)
    return <div>{error?.message || "Something went wrong"}</div>;

  return <RecipePicker recipes={recipes} />;
};

export default RecipePickerWrapper;
