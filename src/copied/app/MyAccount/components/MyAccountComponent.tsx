import React from "react";
import { T } from "core-components";
import SmallRecipeCard from "./SmallRecipeCard";
import { IRecipe } from "../../../../types/types";

interface IMyAccountComponentType {
  title: string;
  recipes: IRecipe[] | undefined;
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
