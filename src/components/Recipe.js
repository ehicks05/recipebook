import React from "react";

function Recipe(props) {
    const recipe = props.recipe;
    const ingredients = recipe.ingredients.map(ingredient =>
        <li key={ingredient}>{ingredient}</li>
    );

    const directions = (
        <div className={'content'}>
            <ol>
                {recipe.directions.map((direction) => <li>{direction}</li>)}
            </ol>
        </div>
    );

    return (

        <>
            <div id={'ingredients-column'} className={'column is-one-quarter'}>
                <div key={recipe.name}>
                    <h3 className='subtitle'>Ingredients:</h3>

                <div className={'content'}>
                    <ul>
                        {ingredients}
                    </ul>
                </div>

                </div>
            </div>

            <div id={'directions-column'} className={'column'}>
                <div key={recipe.name}>
                    <h3 className={'subtitle'}>Directions:</h3>
                    <p>{directions}</p>
                </div>
            </div>
        </>
    );
}

export default Recipe;