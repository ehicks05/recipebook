import { create, all, MathJsStatic, Fraction } from 'mathjs';
import React, { useState } from 'react';
import { IIngredient } from '../../../types/types';

const math = create(all, {}) as MathJsStatic;

interface IIngredientProps {
  ingredient: IIngredient;
  recipeServings: number;
  desiredServings: number;
}

// parses numbers, as well as fractions and fractions like '1 1/4'
function parseQuantity(quantity: string) {
  if (!Number.isNaN(Number(quantity))) return quantity;

  if (quantity.indexOf(' ') !== -1) {
    const parts = quantity.split(' ');

    return parts.reduce(
      (accumulator, part) => Number(accumulator) + math.evaluate(part),
    );
  }

  return math.evaluate(quantity);
}

// figures out the desired quantity and formats it as a nice fraction if necessary.
function getDesiredQuantity(
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number,
): JSX.Element {
  const ratio = desiredServings / defaultServings;
  const desiredQuantity = parseQuantity(ingredient.quantity) * ratio;

  if (desiredQuantity === 0) return <></>;

  if (desiredQuantity === Math.round(desiredQuantity)) return <>{desiredQuantity}</>;

  let fractional = desiredQuantity;
  let nonfractional = 0;
  while (fractional > 1) {
    nonfractional += 1;
    fractional -= 1;
  }

  const fraction = math.fraction(fractional) as Fraction;

  return (
    <>
      {nonfractional ? `${nonfractional} ` : ''}
      {`${fraction.n}${String.fromCharCode(8260)}${fraction.d}`}
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
    desiredServings,
  );

  return (
    <div key={ingredient.name}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
        <span style={{ opacity: isChecked ? '.5' : '', paddingLeft: '.25em' }}>
          {desiredQuantity}
          {` ${ingredient.unit || ''} ${ingredient.name}`}
        </span>
      </label>
    </div>
  );
}

export default Ingredient;
