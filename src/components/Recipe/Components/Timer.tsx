import React from "react";
import { Button, MyInput } from "components/core";
import clsx from "clsx";
import { useTimer } from "components/hooks/useTimer";

interface Props {
  minutes: number;
}

function Timer({ minutes }: Props) {
  const {
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    displayTime,
    handleSetTime,
  } = useTimer({ minutes });
  const isShowResetButton = paused && hasTimeElapsed;

  const base = "h-full rounded-r-none text-center text-xs";
  return (
    <div className="flex h-9">
      <MyInput
        type="text"
        containerClassName="w-fit"
        className={clsx(base, { "bg-red-700 dark:bg-red-900": expired })}
        size={displayTime().length}
        value={displayTime()}
        onChange={handleSetTime}
      />
      {!expired && (
        <Button
          className={`rounded-l-none text-xs ${
            isShowResetButton ? "rounded-r-none" : ""
          }`}
          onClick={() => setPaused(!paused)}
        >
          {isShowResetButton ? "Resume" : paused ? "Start" : "Pause"}
        </Button>
      )}

      {isShowResetButton && (
        <Button className="rounded-l-none text-xs" onClick={() => reset()}>
          Reset
        </Button>
      )}
    </div>
  );
}

export default Timer;
