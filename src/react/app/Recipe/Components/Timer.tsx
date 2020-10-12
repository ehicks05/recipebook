import React, { useEffect, useRef, useState } from "react";

interface IProps {
  minutes: number;
}

function Timer({ minutes }: IProps) {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [paused, setPaused] = useState(true);
  const [expired, setExpired] = useState(false);

  const secondsRef = useRef(seconds);
  const interval = useRef(0);

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    secondsRef.current = seconds;

    if (seconds <= 0) {
      toggleTimer();
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
    if (expired) {
      setSeconds(60 * minutes);
      setExpired(false);
    } else setPaused(!paused);
  }

  function displayTime() {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return min + ":" + (sec < 10 ? `0${sec}` : sec);
  }

  return (
    <div>
      <div className="field has-addons">
        <p className="control">
          <button className={`button is-small ${expired ? "is-danger" : ""}`}>
            {displayTime()}
          </button>
        </p>
        <p className="control is-expanded">
          <button className={"button is-small"} onClick={toggleTimer}>
            {paused ? (expired ? "Reset" : "Start") : "Pause"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Timer;
