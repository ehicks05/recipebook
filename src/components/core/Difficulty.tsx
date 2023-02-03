import React from "react";
import { clamp, range } from "lodash";
import { Button, T } from "./";

const DIFFICULTIES: Record<number, { label: string; color: string }> = {
  1: { label: "Easy", color: "bg-green-500" },
  2: { label: "Medium", color: "bg-yellow-500" },
  3: { label: "Hard", color: "bg-red-500" },
};

const inactiveColor = "bg-neutral-300 dark:bg-neutral-500";

const DifficultyIcon = ({ difficulty }: { difficulty: number }) => (
  <div className="-my-1 flex flex-col-reverse gap-0.5">
    {range(1, 4).map((i) => {
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
