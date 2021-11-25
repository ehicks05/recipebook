import React, { useState } from 'react';
import Fraction from 'fraction.js';
import { IIngredient } from '../../../types/types';

interface IIngredientProps {
  ingredient: IIngredient;
  recipeServings: number;
  desiredServings: number;
}

const formatFraction = (numerator: number, denominator: number) =>
  `${numerator}${String.fromCharCode(8260)}${denominator}`;

// figures out the desired quantity and formats it as a nice fraction if necessary.
function getDesiredQuantity(
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number
): JSX.Element {
  const ratio = desiredServings / defaultServings;
  const desiredQuantity =
    new Fraction(ingredient.quantity || 0).valueOf() * ratio;

  if (desiredQuantity === 0) return <span />;

  if (desiredQuantity === Math.round(desiredQuantity))
    return <span>{desiredQuantity}</span>;

  let fractional = desiredQuantity;
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
  desiredServings,
}: IIngredientProps) {
  const [isChecked, setIsChecked] = useState(false);

  const desiredQuantity = getDesiredQuantity(
    ingredient,
    recipeServings,
    desiredServings
  );

  return (
    <div key={ingredient.name}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span
          style={{
            opacity: isChecked ? '.5' : '',
            display: 'block',
            marginLeft: '1.2rem',
            marginTop: '-1.2rem',
          }}
        >
          {desiredQuantity}
          {` ${ingredient.unit || ''} ${ingredient.name}`}
        </span>
      </label>
    </div>
  );
}

export default Ingredient;
