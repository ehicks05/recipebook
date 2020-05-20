import React, { Component } from "react";

function Recipe(props) {
    const recipe = props.recipe;
    const ingredients = recipe.ingredients.map(ingredient =>
        <div key={ingredient} style={{paddingLeft: '1em'}}>
            <label className="checkbox">
                <input type='checkbox' />
                <span style={{paddingLeft: '.25em'}}>{ingredient}</span>
            </label>
        </div>
    );

    const directions = (
        <div className={'content'}>
            <ol>
                {recipe.directions.map((direction) => <Direction key={direction} direction={direction} />)}
            </ol>
        </div>
    );

    return (

        <>
            <div id={'ingredients-column'} className={'column is-one-quarter'} style={{backgroundColor: '#fafafa'}}>
                <div key={recipe.name}>
                    <h3 className='subtitle'>Ingredients:</h3>

                <div className={'content'}>
                    {ingredients}
                </div>

                </div>
            </div>

            <div id={'directions-column'} className={'column'}>
                <div key={recipe.name}>
                    <h3 className={'subtitle'}>Directions:</h3>
                    {directions}
                </div>
            </div>
        </>
    );
}

function Direction(props) {
    const direction = props.direction;

    const words = direction.split(' ');
    const timeIndex = words.findIndex(word => word.indexOf('minute') > -1 || word.indexOf('hour') > -1);
    let timeAmount = 0;
    if (timeIndex > -1)
    {
        timeAmount = parseInt(words[timeIndex - 1], 10);
        if (isNaN(timeAmount))
            timeAmount = 0;

        let isHours = false;
        if (words[timeIndex].indexOf('hour') > -1)
            isHours = true;

        if (isHours)
            timeAmount *= 60;
    }

    const timer = timeAmount > 0 ? <Timer minutes={timeAmount}/> : null;

    return (
        <li key={direction}>{direction} {timer}</li>
    );
}

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

export default Recipe;