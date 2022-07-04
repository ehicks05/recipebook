import React from 'react';
import { clamp, range } from 'lodash';
import RecipeStat from 'core-components/RecipeStat';
import T from 'core-components/T';

const DIFFICULTIES: Record<number, { label: string; color: string }> = {
  1: { label: 'Easy', color: 'bg-green-500' },
  2: { label: 'Medium', color: 'bg-yellow-500' },
  3: { label: 'Hard', color: 'bg-red-500' },
};

const DifficultyIcon = ({ difficulty }: { difficulty: number }) => (
  <div className="flex flex-col-reverse gap-0.5">
    {range(1, 4).map(i => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          difficulty >= i
            ? DIFFICULTIES[i]?.color
            : 'bg-neutral-300 dark:bg-neutral-500'
        }`}
      />
    ))}
  </div>
);

const Difficulty = ({ difficulty }: { difficulty: number }) => (
  <RecipeStat>
    <DifficultyIcon difficulty={difficulty} />
    <T className="text-sm font-semibold">
      {DIFFICULTIES[clamp(difficulty, 1, 3)]?.label || 'Fix this recipe'}
    </T>
  </RecipeStat>
);

export default Difficulty;
