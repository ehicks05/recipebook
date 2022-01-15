import React, { Dispatch, SetStateAction } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Ingredient } from '.';
import Button from '../../../components/Button';
import T from '../../../components/T';
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
