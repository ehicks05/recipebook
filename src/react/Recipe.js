import React from "react";
import Timer from "./Timer";

function Recipe(props) {
    const recipe = props.recipe;

    const ingredients = (
        <div className={'content'}>
            {recipe.ingredients.map((ingredient) => <Ingredient key={ingredient.name} ingredient={ingredient} />)}
        </div>
    );

    const directions = (
        <div className={'content'}>
            <ol style={{marginLeft: '16px'}}>
                {recipe.directions.map((direction) => <Direction key={direction.text} direction={direction.text} />)}
            </ol>
        </div>
    );

    return (
        <>
            <div id={'ingredients-column'} className={'column is-one-quarter'} style={{backgroundColor: '#fafafa'}}>
                <div key={recipe.name}>
                    <h3 className='subtitle'>Ingredients:</h3>
                    {ingredients}
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

function Ingredient(props) {
    const ingredient = props.ingredient;
    return (
        <div key={ingredient.name}>
            <label className="checkbox">
                <input type='checkbox' />
                <span style={{paddingLeft: '.25em'}}>
                    {ingredient.quantity && ingredient.quantity}
                    &nbsp;{ingredient.unit && ingredient.unit}
                    &nbsp;{ingredient.name}
                </span>
            </label>
        </div>
    );
}

function Direction(props) {
    const direction = props.direction;
    
    let timeAmount = extractTiming(direction);
    const timer = timeAmount > 0 ? <Timer minutes={timeAmount}/> : null;

    return (
        <li key={direction}>{direction} {timer}</li>
    );
}

function extractTiming(text) {
    const words = text.split(' ');
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

    return timeAmount;
}

export default Recipe;