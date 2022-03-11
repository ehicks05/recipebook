import React, { useState } from 'react';
import Timer from './Timer';
import { IDirection } from '../../../types/types';
import T from '../../../components/T';

interface IDirectionProps {
  direction: IDirection;
}

function extractTiming(text: string) {
  const words = text.split(' ');
  const timeIndex = words.findIndex(
    word => word.indexOf('minute') > -1 || word.indexOf('hour') > -1
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
      className={`cursor-pointer ${isDone ? 'line-through opacity-50' : ''}`}
    >
      <div onClick={() => setIsDone(!isDone)}>
        <T>{direction.text}</T>
      </div>
      {!isDone && timer}
    </li>
  );
}

export default Direction;
