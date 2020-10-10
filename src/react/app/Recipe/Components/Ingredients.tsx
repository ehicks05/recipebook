import React from "react";
import { Ingredient } from ".";
import { IIngredient } from "../../../types/types";

interface IProps {
  ingredients: IIngredient[];
  defaultServings: number;
  desiredServings: number;
  incrementServings: () => void;
  decrementServings: () => void;
}

function Ingredients({
  ingredients,
  defaultServings,
  desiredServings,
  incrementServings,
  decrementServings,
}: IProps) {
  return (
    <div className={"content"}>
      <div style={{ marginBottom: "8px" }}>
        <span className="button is-small" aria-readonly={true}>
          Servings: {desiredServings}
        </span>
        <button
          className="button is-small"
          onClick={decrementServings}
          disabled={desiredServings === 1}
        >
          -
        </button>
        <button className="button is-small" onClick={incrementServings}>
          +
        </button>
      </div>

      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          ingredient={ingredient}
          recipeServings={defaultServings}
          desiredServings={desiredServings}
        />
      ))}
    </div>
  );
}

export default Ingredients;
