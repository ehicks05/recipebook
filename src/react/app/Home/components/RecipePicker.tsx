import React, { useEffect, useState } from "react";
import { IRecipe } from "../../../types/types";
import RecipeGrid from "./RecipeGrid";

interface IProps {
  recipes: IRecipe[];
  favoriteIds: number[];
  fetchFavorites: () => void;
}

function RecipePicker({ recipes, favoriteIds, fetchFavorites }: IProps) {
  const [recipeFilters, setRecipeFilters] = useState<string[]>([]);
  const [usableRecipes, setUsableRecipes] = useState(recipes);

  // handle recipeFilters changing...
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => {
      let recipeIngredients = recipe.ingredients
        .map((x) => x.name.toLowerCase())
        .join();

      let keep = true;
      recipeFilters.forEach((element) => {
        if (!recipeIngredients.includes(element)) {
          keep = false;
        }
      });

      return keep;
    });

    setUsableRecipes(filteredRecipes);
  }, [recipeFilters, recipes]);

  function handleAddRecipeFilter() {
    const input = document.getElementById(
      "recipeFilterInput"
    ) as HTMLFormElement;
    let newFilter = input.value.toLowerCase();
    if (newFilter.length > 1 && !recipeFilters.includes(newFilter)) {
      setRecipeFilters([...recipeFilters, newFilter]);
    }

    input.value = "";
  }

  function handleClearRecipeFilter(filter: string) {
    setRecipeFilters(recipeFilters.filter((f) => f !== filter));
  }

  function handleClearAllRecipeFilters() {
    setRecipeFilters([]);
  }

  const filterPills = recipeFilters.map((f) => (
    <span key={f} className={"tag is-link"}>
      {f}
      <button className={"delete"} onClick={() => handleClearRecipeFilter(f)} />
    </span>
  ));

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="control">
          <div className="field has-addons">
            <div className="control">
              <input
                id="recipeFilterInput"
                className="input"
                type="text"
                placeholder="Search by Ingredient"
              />
            </div>
            <div className="control">
              <button
                className={"button"}
                onClick={() => handleAddRecipeFilter()}
              >
                Add
              </button>
              {recipeFilters.length > 0 && (
                <button
                  className={"button"}
                  onClick={() => handleClearAllRecipeFilters()}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="tags">{recipeFilters.length > 0 && filterPills}</div>
        </div>
      </form>

      <RecipeGrid recipes={usableRecipes} favoriteIds={favoriteIds} fetchFavorites={fetchFavorites} />
    </div>
  );
}

export default RecipePicker;
