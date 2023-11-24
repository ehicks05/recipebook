import React from "react";
import { Button, MyInput } from "components/core";
import clsx from "clsx";
import { useTimer } from "components/hooks/useTimer";
import { HiPlus } from "react-icons/hi";

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
    updateMinutes,
  } = useTimer({ minutes });
  const isShowResetButton = paused && hasTimeElapsed;

  const base = "h-full rounded-r-none text-center text-xs";
  return (
    <div className="flex h-9">
      <MyInput
        type="text"
        containerClassName="w-max"
        fullWidth={false}
        readOnly
        className={clsx(base, { "bg-red-700 dark:bg-red-900": expired })}
        size={displayTime.length}
        value={displayTime}
      />
      {!expired && (
        <>
          <Button
            className={`rounded-none text-xs`}
            onClick={() => updateMinutes(1)}
          >
            <HiPlus />
          </Button>
          <Button
            className={`rounded-l-none text-xs ${
              isShowResetButton ? "rounded-r-none" : ""
            }`}
            onClick={() => setPaused(!paused)}
          >
            {isShowResetButton ? "Resume" : paused ? "Start" : "Pause"}
          </Button>
        </>
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
