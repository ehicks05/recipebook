import React from "react";
import { Button, T } from "./";

const DIFFICULTIES: Record<number, { label: string; color: string }> = {
  1: { label: "Easy", color: "bg-green-500" },
  2: { label: "Medium", color: "bg-yellow-500" },
  3: { label: "Hard", color: "bg-red-500" },
};

const inactiveColor = "bg-neutral-300 dark:bg-neutral-500";

const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

const DifficultyIcon = ({ difficulty }: { difficulty: number }) => (
  <div className="-my-1 flex flex-col-reverse gap-[1px]">
    {[1, 2, 3].map((i) => {
      const activeColor = DIFFICULTIES[i]?.color || inactiveColor;
      const color = difficulty >= i ? activeColor : inactiveColor;

      return <div key={i} className={`h-2 w-2 rounded-full ${color}`} />;
    })}
  </div>
);

const Difficulty = ({ difficulty }: { difficulty: number }) => (
  <Button isStatic>
    <DifficultyIcon difficulty={difficulty} />
    <T className="text-sm font-semibold">
      {DIFFICULTIES[clamp(difficulty, 1, 3)]?.label || "Fix this recipe"}
    </T>
  </Button>
);

export default Difficulty;
