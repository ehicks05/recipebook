import React from "react";
import { T } from "components/core";
import SmallRecipeCard from "./SmallRecipeCard";
import type { CompleteRecipe } from "server/api/routers/example";

interface IMyAccountComponentType {
  title: string;
  recipes: CompleteRecipe[] | undefined;
}

function MyAccountComponent({ title, recipes }: IMyAccountComponentType) {
  return (
    <div>
      <T className="mb-4 text-center text-lg font-semibold">{title}</T>
      <div className="flex flex-col gap-4">
        {recipes?.map((recipe) => (
          <SmallRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default MyAccountComponent;
