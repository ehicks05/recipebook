import React, { useEffect, useRef, useState } from "react";

interface IProps {
  minutes: number;
}

function Timer(props: IProps) {
  const [seconds, setSeconds] = useState(props.minutes * 60);
  const [paused, setPaused] = useState(true);
  const [myInterval, setMyInterval] = useState(0);

  const secondsRef = useRef(seconds);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    function startTimer() {
      function decrement() {
        setSeconds(secondsRef.current - 1);
      }

      setMyInterval(window.setInterval(decrement, 1000));
    }

    if (paused) clearInterval(myInterval);
    else startTimer();
  }, [paused]);

  useEffect(() => {
    return () => {
      clearInterval(myInterval);
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
          <button className="button is-static is-small">{displayTime()}</button>
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
