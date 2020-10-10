import React, { useEffect, useRef, useState } from "react";

interface IProps {
  minutes: number;
}

function Timer({ minutes }: IProps) {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [paused, setPaused] = useState(true);

  const secondsRef = useRef(seconds);
  const interval = useRef(0);

  useEffect(() => {
    secondsRef.current = seconds;
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

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  function togglePause() {
    setPaused(!paused);
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
          <button className="button is-small">{displayTime()}</button>
        </p>
        <p className="control is-expanded">
          <button className={"button is-small"} onClick={togglePause}>
            {paused ? "Start" : "Pause"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Timer;
