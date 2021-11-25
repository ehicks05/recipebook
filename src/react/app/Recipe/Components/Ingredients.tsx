import React, { Dispatch, SetStateAction } from 'react';
import { FaMinus, FaPlus } from 'react-icons/all';
import { Ingredient } from '.';
import { IIngredient } from '../../../types/types';

interface IProps {
  ingredients: IIngredient[];
  defaultServings: number;
  scaledServings: number;
  setScaledServings: Dispatch<SetStateAction<number>>;
}

function Ingredients({
  ingredients,
  defaultServings,
  scaledServings,
  setScaledServings,
}: IProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="" title={`default servings: ${defaultServings}`}>
          Servings: {scaledServings}
        </span>
        <div>
          <button
            type="button"
            className="button is-small"
            onClick={() => setScaledServings(scaledServings - 1)}
            disabled={scaledServings === 1}
          >
            <FaMinus />
          </button>
          <button
            type="button"
            className="button is-small"
            onClick={() => setScaledServings(scaledServings + 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {ingredients.map(ingredient => (
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
