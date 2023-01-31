import React, { useEffect, useRef, useState } from "react";
import { Button } from "components/core";

interface IProps {
  minutes: number;
}

function Timer({ minutes: inputMinutes }: IProps) {
  const [seconds, setSeconds] = useState(inputMinutes * 60);
  const [paused, setPaused] = useState(true);
  const [expired, setExpired] = useState(false);

  const secondsRef = useRef(seconds);
  const interval = useRef(0);

  useEffect(() => () => clearInterval(interval.current), []);

  useEffect(() => {
    secondsRef.current = seconds;

    if (seconds <= 0) {
      setPaused(true);
      setExpired(true);
    }
  }, [seconds]);

  useEffect(() => {
    function startTimer() {
      function decrement() {
        setSeconds(secondsRef.current - 1);
      }

      interval.current = window.setInterval(decrement, 1000);
    }

    if (paused) clearInterval(interval.current);
    else startTimer();
  }, [paused]);

  function reset() {
    setSeconds(60 * inputMinutes);
    setExpired(false);
    setPaused(true);
  }

  function displayTime() {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  function handleSetTime(e: React.ChangeEvent<HTMLInputElement>) {
    if (expired) {
      return;
    }
    const { value } = e.target;
    if (value.indexOf(":") === -1) return;
    const [m, s] = value.split(":").map((it) => Number(it)) as [number, number];
    if (Number.isNaN(m) || Number.isNaN(s)) return;
    setSeconds(Math.min(m * 60 + s, 999 * 60 + 59));
  }

  const hasTimeElapsed = seconds !== inputMinutes * 60;
  const isShowResetButton = paused && hasTimeElapsed;

  return (
    <div className="flex">
      <input
        type="text"
        className={`rounded-l-sm border border-neutral-200 bg-neutral-100 px-2 py-1 text-center text-xs dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 ${
          expired ? "bg-red-700" : ""
        }`}
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
