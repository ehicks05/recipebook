import React from "react";
import { T } from "components/core";
import type { CompleteRecipe } from "server/api/routers/example";
// import { RecipeCardOld } from "components/Home/RecipeCard";
import SmallRecipeCard from "./SmallRecipeCard";

interface Props {
  title: string;
  recipes: CompleteRecipe[] | undefined;
}

const RecipeList = ({ title, recipes }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <T className="text-center text-lg font-semibold">{title}</T>
      <div className="flex flex-col gap-4">
        {recipes?.map((recipe) => (
          <SmallRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
