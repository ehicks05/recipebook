import React from 'react';
import { Direction } from '.';
import { IDirection } from '../../../types/types';

interface IProps {
  directions: IDirection[];
}

function Directions({ directions }: IProps) {
  return (
    <div className="content">
      <ol className="ml-4 list-decimal dark:text-neutral-200">
        {directions.map(direction => (
          <Direction key={direction.text} direction={direction} />
        ))}
      </ol>
    </div>
  );
}

export default Directions;
