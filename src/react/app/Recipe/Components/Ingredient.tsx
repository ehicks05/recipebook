import React, { Dispatch, SetStateAction, useState } from 'react';
import Fraction from 'fraction.js';
import { IIngredient } from '../../../types/types';

interface IIngredientProps {
  ingredient: IIngredient;
  recipeServings: number;
  desiredServings: number;
  highlightedIngredient?: string;
  setHighlightedIngredient: Dispatch<SetStateAction<string | undefined>>;
}

const formatFraction = (numerator: number, denominator: number) =>
  `${numerator}${String.fromCharCode(8260)}${denominator}`;

// figures out the desired quantity and formats it as a nice fraction if necessary.
function getDesiredQuantity(
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number,
): JSX.Element {
  const ratio = desiredServings / defaultServings;
  const desiredQuantity = new Fraction(ingredient.quantity).valueOf() * ratio;

  if (desiredQuantity === 0) return <></>;

  if (desiredQuantity === Math.round(desiredQuantity)) return <>{desiredQuantity}</>;

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
  highlightedIngredient,
  setHighlightedIngredient,
}: IIngredientProps) {
  const [isChecked, setIsChecked] = useState(false);

  const desiredQuantity = getDesiredQuantity(
    ingredient,
    recipeServings,
    desiredServings,
  );

  return (
    <div
      key={ingredient.name}
      onMouseEnter={() => setHighlightedIngredient(ingredient.name)}
      onMouseLeave={() => setHighlightedIngredient(undefined)}
    >
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
        <span
          style={{
            opacity: isChecked ? '.5' : '',
            display: 'block',
            marginLeft: '1.2rem',
            marginTop: '-1.2rem',
            fontWeight:
              highlightedIngredient === ingredient.name ? 'bold' : 'normal',
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
