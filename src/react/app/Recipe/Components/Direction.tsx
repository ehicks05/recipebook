import React, { useState } from 'react';
import Timer from './Timer';
import { IDirection } from '../../../types/types';

interface IDirectionProps {
  direction: IDirection;
}

function extractTiming(text: string) {
  const words = text.split(' ');
  const timeIndex = words.findIndex(
    word => word.indexOf('minute') > -1 || word.indexOf('hour') > -1,
  );
  let timeAmount = 0;
  if (timeIndex > -1) {
    timeAmount = parseInt(words[timeIndex - 1], 10);
    if (Number.isNaN(timeAmount)) timeAmount = 0;

    let isHours = false;
    if (words[timeIndex].indexOf('hour') > -1) isHours = true;

    if (isHours) timeAmount *= 60;
  }

  return timeAmount;
}

function Direction({ direction }: IDirectionProps) {
  const [isDone, setIsDone] = useState(false);
  const timeAmount = extractTiming(direction.text);
  const timer = timeAmount > 0 ? <Timer minutes={timeAmount} /> : null;

  return (
    <li
      key={direction.text}
      style={{
        opacity: isDone ? '0.5' : '',
      }}
      className="glow"
    >
      <div
        style={{
          textDecoration: isDone ? 'line-through' : '',
          cursor: 'pointer',
        }}
        onClick={() => setIsDone(!isDone)}
      >
        {direction.text}
      </div>
      {timer}
    </li>
  );
}

export default Direction;
