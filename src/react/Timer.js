import React, {useEffect, useRef, useState} from "react";

function Timer(props) {
    const [seconds, setSeconds] = useState(props.minutes * 60);
    const [paused, setPaused] = useState(true);
    const [myInterval, setMyInterval] = useState(0);

    const secondsRef = useRef(seconds);

    useEffect(() => {
        secondsRef.current = seconds }
        , [seconds]);

    useEffect(() => {
        if (paused)
            clearInterval(myInterval);
        else
            startTimer();
    }, [paused]);

    useEffect(() => {
        return () => {
            clearInterval(myInterval);
        }
    }, []);

    function decrement() {
        setSeconds(secondsRef.current - 1);
    }

    function startTimer() {
        setMyInterval(setInterval(decrement, 1000));
    }

    function togglePause() {
        setPaused(!paused);
    }

    function displayTime() {
        const min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        if (sec < 10) sec = `0${sec}`;
        return min + ':' + sec;
    }

    return (
        <div>
            <div className="field has-addons">
                <p className="control">
                    <a className="button is-static is-small">
                        {displayTime()}
                    </a>
                </p>
                <p className="control is-expanded">
                    <button className={'button is-small'} onClick={togglePause}>{paused ? 'Start' : 'Pause'}</button>
                </p>
            </div>
        </div>
    )
}

export default Timer;