import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button, T } from "components/core";
import { Ingredient } from ".";
import type { ingredient } from "@prisma/client";

interface Props {
  ingredients: ingredient[];
  defaultServings: number;
  scaledServings: number;
  setScaledServings: Dispatch<SetStateAction<number>>;
}

function Ingredients({
  ingredients,
  defaultServings,
  scaledServings,
  setScaledServings,
}: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <T>Servings: {scaledServings}</T>
        <div>
          <Button
            className="is-small"
            onClick={() => setScaledServings(scaledServings - 1)}
            disabled={scaledServings === 1}
          >
            <FaMinus />
          </Button>
          <Button
            className="is-small"
            onClick={() => setScaledServings(scaledServings + 1)}
          >
            <FaPlus />
          </Button>
        </div>
      </div>

      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          ingredient={ingredient}
          recipeServings={defaultServings}
          scaledServings={scaledServings}
        />
      ))}
    </div>
  );
}

export default Ingredients;
