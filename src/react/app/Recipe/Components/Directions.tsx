import React, { Dispatch, SetStateAction } from 'react';
import { Direction } from '.';
import { IDirection, IIngredient } from '../../../types/types';

interface IProps {
  ingredients: IIngredient[];
  directions: IDirection[];
  highlightedIngredient?: string;
  setHighlightedIngredient: Dispatch<SetStateAction<string | undefined>>;
}

function Directions({
  ingredients,
  directions,
  highlightedIngredient,
  setHighlightedIngredient,
}: IProps) {
  return (
    <div className="content">
      <ol style={{ marginLeft: '16px' }}>
        {directions.map(direction => (
          <Direction
            key={direction.index}
            ingredients={ingredients}
            direction={direction}
            highlightedIngredient={highlightedIngredient}
            setHighlightedIngredient={setHighlightedIngredient}
          />
        ))}
      </ol>
    </div>
  );
}

export default Directions;
