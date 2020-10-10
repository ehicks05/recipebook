import { create, all, MathJsStatic, Fraction } from 'mathjs';
import React from 'react';
import { IIngredient } from '../../../types/types';

const math = create(all, {}) as MathJsStatic;

interface IIngredientProps {
  ingredient: IIngredient;
  recipeServings: number;
  desiredServings: number;
}

// parses numbers, as well as fractions and fractions like '1 1/4'
function parseQuantity(quantity: string) {
  if (!isNaN(Number(quantity))) return quantity;

  if (quantity.indexOf(' ') !== -1) {
    const parts = quantity.split(' ');

    return parts.reduce(
      (accumulator, part) => Number(accumulator) + math.evaluate(part)
    );
  }

  return math.evaluate(quantity);
}

// figures out the desired quantity and formats it as a nice fraction if necessary.
function getDesiredQuantity(
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number
): JSX.Element {
  const ratio = desiredServings / defaultServings;
  const desiredQuantity = parseQuantity(ingredient.quantity) * ratio;

  if (desiredQuantity === 0) return <></>;

  if (desiredQuantity === Math.round(desiredQuantity))
    return <>{desiredQuantity}</>;
  else {
    let fractional = desiredQuantity;
    let nonfractional = 0;
    while (fractional > 1) {
      nonfractional++;
      fractional -= 1;
    }

    const fraction = math.fraction(fractional) as Fraction;

    let result = (
      <>
        <sup>{fraction.n}</sup>/<sub>{fraction.d}</sub>
      </>
    );
    if (nonfractional !== 0)
      result = (
        <>
          {nonfractional} {result}
        </>
      );
    return result;
  }
}

function Ingredient(props: IIngredientProps) {
  const { ingredient, recipeServings, desiredServings } = props;

  const desiredQuantity = getDesiredQuantity(
    ingredient,
    recipeServings,
    desiredServings
  );

  return (
    <div key={ingredient.name}>
      <label className="checkbox">
        <input type="checkbox" />
        <span style={{ paddingLeft: '.25em' }}>
          {desiredQuantity}
          &nbsp;{ingredient.unit && ingredient.unit}
          &nbsp;{ingredient.name}
        </span>
      </label>
    </div>
  );
}

export default Ingredient;
