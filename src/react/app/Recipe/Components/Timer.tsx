import React, { useEffect, useRef, useState } from 'react';

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

  function toggleTimer() {
    setPaused(!paused);
  }

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
    <div>
      <div className="field has-addons">
        <p className="control">
          <input
            type="text"
            className={`input is-small has-text-centered ${
              expired ? 'is-danger' : ''
            }`}
            size={Math.max(displayTime().length - 4, 1)}
            value={displayTime()}
            style={{ zIndex: 2 }}
            onChange={handleSetTime}
          />
        </p>
        <p className="control is-expanded">
          {!expired && (
            <button
              type="button"
              className="button is-small"
              onClick={toggleTimer}
            >
              {paused ? 'Start' : 'Pause'}
            </button>
          )}

          {paused && seconds !== inputMinutes * 60 && (
            <button type="button" className="button is-small" onClick={reset}>
              Reset
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default Timer;
