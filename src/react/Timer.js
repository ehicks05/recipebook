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
        function startTimer() {
            function decrement() {
                setSeconds(secondsRef.current - 1);
            }

            setMyInterval(setInterval(decrement, 1000));
        }

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
                    <button className="button is-static is-small">
                        {displayTime()}
                    </button>
                </p>
                <p className="control is-expanded">
                    <button className={'button is-small'} onClick={togglePause}>{paused ? 'Start' : 'Pause'}</button>
                </p>
            </div>
        </div>
    )
}

export default Timer;