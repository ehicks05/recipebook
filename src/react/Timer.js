import React, {Component} from "react";

class Timer extends Component {
    constructor(props)
    {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);

        this.state = {
            minutes: props.minutes,
            seconds: 0,
            paused: true
        };
    }

    startTimer() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state;

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000);

        this.setState({paused: false})
    }

    stopTimer() {
        clearInterval(this.myInterval);
        this.setState({paused: true});
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state;

        const button = this.state.paused ?
            <button className={'button is-small'} onClick={this.startTimer}>Start</button>
            :
            <button className={'button is-small'} onClick={this.stopTimer}>Pause</button>
        ;

        return (
            <div>
                <div className="field has-addons">
                    <p className="control">
                        <a className="button is-static is-small">
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </a>
                    </p>
                    <p className="control is-expanded">
                        {button}
                    </p>
                </div>
            </div>
        )
    }
}

export default Timer;