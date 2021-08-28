import React, { Dispatch, SetStateAction, useState } from 'react';
import Highlighter, { HighlighterProps } from 'react-highlight-words';
import Timer from './Timer';
import { IDirection, IIngredient } from '../../../types/types';

interface IDirectionProps {
  ingredients: IIngredient[];
  direction: IDirection;
  highlightedIngredient?: string;
  setHighlightedIngredient: Dispatch<SetStateAction<string | undefined>>;
}

function extractTiming(text: string) {
  const words = text.split(/\W+/);
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

function Direction({
  ingredients,
  direction,
  highlightedIngredient,
  setHighlightedIngredient,
}: IDirectionProps) {
  const [isDone, setIsDone] = useState(false);
  const timeAmount = extractTiming(direction.text);
  const timer = timeAmount > 0 ? <Timer minutes={timeAmount} /> : null;

  return (
    <li
      key={direction.index}
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
        <ParsedText
          ingredients={ingredients}
          text={direction.text}
          highlightedIngredient={highlightedIngredient}
          setHighlightedIngredient={setHighlightedIngredient}
        />
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={ingredients.map(i => i.name)}
          autoEscape
          textToHighlight={direction.text}
          highlightTag={HighlightTag}
        />
      </div>
      {timer}
    </li>
  );
}

const HighlightTag = ({ children, highlightIndex }: HighlighterProps) => (
  <mark>{children}</mark>
);

interface IParsedTextProps {
  ingredients: IIngredient[];
  text: string;
  highlightedIngredient?: string;
  setHighlightedIngredient: Dispatch<SetStateAction<string | undefined>>;
}

const ParsedText = ({
  ingredients,
  text,
  highlightedIngredient,
  setHighlightedIngredient,
}: IParsedTextProps) => {
  const words = text.split(/\W+/);

  const matches = ingredients
    .map(i => i.name)
    .map(ingredient => {
      const ingredientWords = ingredient.split(/\W+/);
      const window = ingredientWords.length;

      const ingredientMatches = words
        .map((startWord, i) => {
          const chunk = words.slice(i, i + window);
          const match = chunk.join(' ') === ingredient;
          return match ? [i, i + window - 1] : undefined;
        })
        .filter(i => i);
      return { [ingredient]: ingredientMatches };
    })
    .filter(i => Object.values(i)[0].length > 0);

  if (matches.length > 0) console.log(matches);

  const matchedIndices = matches
    .map(match => Object.values(match))
    .flat()
    .flat()
    .filter(m => m)
    .sort((o1, o2) => o1![0] - o2![0]);

  console.log(matchedIndices);

  const annotatedWords = words.map((word, i) => {
    const matchInfo = matchedIndices.reduce(
      (agg: { isMatch: boolean; ingredient: IIngredient | undefined }, curr) => {
        const start = curr![0];
        const end = curr![1];

        if (i >= start && i <= end) {
          const ingredientName = words.slice(start, end + 1).join(' ');
          const ingredient = ingredients?.find(i => i.name === ingredientName);
          return { isMatch: true, ingredient };
        }
        return agg;
      },
      { isMatch: false, ingredient: undefined },
    );

    const annotatedWord = matchInfo.isMatch ? (
      <span
        style={{
          textDecoration: 'underline',
          textDecorationStyle: 'dashed',
          textUnderlineOffset: '3px',
          fontWeight:
            highlightedIngredient === matchInfo?.ingredient?.name
              ? 'bold'
              : 'normal',
        }}
        onMouseEnter={() => setHighlightedIngredient(matchInfo?.ingredient?.name)}
        onMouseLeave={() => setHighlightedIngredient(undefined)}
      >
        {word}
        {/* ({matchInfo?.ingredient?.quantity} {matchInfo?.ingredient?.unit}) */}
      </span>
    ) : (
      <span>{word}</span>
    );

    return (
      <>
        {annotatedWord}
        {i < words.length - 1 ? '  ' : undefined}
      </>
    );
  });

  return <>{annotatedWords}</>;
};

export default Direction;
