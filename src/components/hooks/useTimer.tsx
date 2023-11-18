import { useState, useRef, useEffect } from "react";

interface Props {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const useTimer = (props: Props) => {
  const initialMs =
    (props?.seconds || 0) * 1000 +
    (props?.minutes || 0) * 1000 * 60 +
    (props?.hours || 0) * 1000 * 60 * 60;

  const [ms, setMs] = useState(initialMs);
  const [paused, setPaused] = useState(true);
  const [expired, setExpired] = useState(false);

  const msRef = useRef(ms);
  const interval = useRef(0);

  useEffect(() => {
    msRef.current = ms;

    if (ms <= 0) {
      setPaused(true);
      setExpired(true);
      setMs(0);
    }
  }, [ms]);

  useEffect(() => {
    function startTimer() {
      function decrement() {
        setMs(msRef.current - 100);
      }

      interval.current = window.setInterval(decrement, 100);
    }

    paused ? clearInterval(interval.current) : startTimer();

    return () => clearInterval(interval.current);
  }, [paused]);

  function reset() {
    setMs(initialMs);
    setExpired(false);
    setPaused(true);
  }

  const displayTime = [
    Math.floor(ms / (1000 * 60 * 60)),
    Math.floor(ms / (1000 * 60)) % 60,
    Math.floor(ms / 1000) % 60,
  ]
    .map((x) => String(x).padStart(2, "0"))
    .join(":");

  function updateMinutes(amount: number) {
    setMs(ms + amount * 60 * 1000);
  }

  const hasTimeElapsed = ms !== initialMs;

  return {
    ms,
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    displayTime,
    updateMinutes,
  };
};
