import React, { useState } from 'react';
import Fraction from 'fraction.js';
import { IIngredient } from '../../../types/types';

interface IIngredientProps {
  ingredient: IIngredient;
  recipeServings: number;
  scaledServings: number;
}

const formatFraction = (numerator: number, denominator: number) =>
  `${numerator}${String.fromCharCode(8260)}${denominator}`;

// figures out the desired quantity and formats it as a nice fraction if necessary.
function scaleQuantity(
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number
): JSX.Element {
  const ratio = desiredServings / defaultServings;
  const scaledQuantity =
    new Fraction(ingredient.quantity || 0).valueOf() * ratio;

  if (scaledQuantity === 0) return <span />;

  if (scaledQuantity === Math.round(scaledQuantity)) {
    return <span>{scaledQuantity}</span>;
  }

  let fractional = scaledQuantity;
  let wholeNumber = 0;
  while (fractional > 1) {
    wholeNumber += 1;
    fractional -= 1;
  }

  const fraction = new Fraction(fractional);

  return (
    <>
      {wholeNumber ? `${wholeNumber} ` : ''}
      {formatFraction(fraction.n, fraction.d)}
    </>
  );
}

function Ingredient({
  ingredient,
  recipeServings,
  scaledServings,
}: IIngredientProps) {
  const [isChecked, setIsChecked] = useState(false);

  const desiredQuantity = scaleQuantity(
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
        <span className={`${isChecked ? 'opacity-50' : ''}`}>
          {desiredQuantity}
          {` ${ingredient.unit || ''} ${ingredient.name}`}
        </span>
      </label>
    </div>
  );
}

export default Ingredient;
