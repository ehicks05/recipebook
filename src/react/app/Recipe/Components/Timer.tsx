import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../components/Button';

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
    if (value.indexOf(':') === -1) return;
    const [m, s] = value.split(':').map(it => Number(it));
    if (Number.isNaN(m) || Number.isNaN(s)) return;
    setSeconds(Math.min(m * 60 + s, 999 * 60 + 59));
  }

  return (
    <div className="flex">
      <input
        type="text"
        className={`px-2 py-1 text-xs text-center bg-neutral-100 dark:bg-neutral-500 dark:text-neutral-200 ${
          expired ? 'bg-red-700' : ''
        }`}
        size={Math.max(displayTime().length - 4, 1)}
        value={displayTime()}
        onChange={handleSetTime}
      />
      {!expired && (
        <Button className="text-xs" onClick={() => setPaused(!paused)}>
          {paused ? 'Start' : 'Pause'}
        </Button>
      )}

      {paused && seconds !== inputMinutes * 60 && (
        <Button className="text-xs" onClick={() => reset()}>
          Reset
        </Button>
      )}
    </div>
  );
}

export default Timer;
