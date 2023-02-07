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
  const seconds = Math.floor(ms / 1000);

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

  function displayTime() {
    const min = Math.floor(ms / (1000 * 60));
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  function handleSetTime(e: React.ChangeEvent<HTMLInputElement>) {
    if (!paused || expired) {
      return;
    }
    const { value } = e.target;
    if (value.indexOf(":") === -1) return;
    const [m, s] = value.split(":").map((it) => Number(it)) as [number, number];
    if (Number.isNaN(m) || Number.isNaN(s)) return;
    const desiredMs = 1000 * s + 1000 * 60 * m;
    const maxMs = 1000 * 60 * 999 + 1000 * 59; // 999 minutes + 59 seconds
    setMs(Math.min(desiredMs, maxMs));
  }

  const hasTimeElapsed = ms !== initialMs;

  return {
    ms,
    seconds: Math.floor(ms / 1000),
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    displayTime,
    handleSetTime,
  };
};
