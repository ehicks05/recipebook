import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/all';
import { Ingredient } from '.';
import { IIngredient } from '../../../types/types';

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
    <div className="content">
      <nav className="level is-mobile mb-2">
        <div className="level-left">
          <span className="level-item">
            <span className="mr-2" title={`default servings: ${defaultServings}`}>
              Servings: {desiredServings}
            </span>
            <button
              className="button is-small"
              onClick={decrementServings}
              disabled={desiredServings === 1}
            >
              <span className="icon">
                <FaMinus />
              </span>
            </button>
            <button className="button is-small" onClick={incrementServings}>
              <span className="icon">
                <FaPlus />
              </span>
            </button>
          </span>
        </div>
      </nav>

      {ingredients.map(ingredient => (
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
