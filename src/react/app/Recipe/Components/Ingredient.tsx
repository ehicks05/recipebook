import React, { useState } from 'react';
import Fraction from 'fraction.js';
import { IIngredient } from '../../../types/types';
import T from '../../../components/T';

interface IIngredientProps {
  ingredient: IIngredient;
  recipeServings: number;
  scaledServings: number;
}

// determine desired quantity and provide fractional formatting
const scaleQuantity = (
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number
) => {
  const ratio = desiredServings / defaultServings;
  const scaledQuantity =
    new Fraction(ingredient.quantity || 0).valueOf() * ratio;

  if (scaledQuantity === 0) return '';

  if (scaledQuantity === Math.round(scaledQuantity)) {
    return String(scaledQuantity);
  }

  let fractional = scaledQuantity;
  let integer = 0;
  while (fractional > 1) {
    integer += 1;
    fractional -= 1;
  }

  const fraction = new Fraction(fractional);

  return `${integer || ''} ${fraction.n}${String.fromCharCode(8260)}${
    fraction.d
  }`;
};

function Ingredient({
  ingredient,
  recipeServings,
  scaledServings,
}: IIngredientProps) {
  const [isChecked, setIsChecked] = useState(false);

  const scaledQuantity = scaleQuantity(
    ingredient,
    recipeServings,
    scaledServings
  );

  return (
    <div key={ingredient.name}>
      <label className="flex gap-2">
        <input
          className="mt-1.5"
          type="checkbox"
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
        <T className={`${isChecked ? 'opacity-50' : ''}`}>
          {`${scaledQuantity} ${ingredient.unit || ''} ${ingredient.name}`}
        </T>
      </label>
    </div>
  );
}

export default Ingredient;
