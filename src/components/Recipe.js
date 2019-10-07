import React from "react";

function Recipe(props) {
    const recipe = props.recipe;
    const ingredients = recipe.ingredients.map(ingredient =>
        <li key={ingredient}>- {ingredient}</li>
    );

    const directions = (
            <ol>
                {recipe.directions.map((direction) => <li>{direction}</li>)}
            </ol>
        );

    return (

        <>
            <div id={'ingredients-column'} className={'column is-one-quarter'}>
                <section className={"section"}>
                    <div className={"container"}>
                        <div key={recipe.name}>
                            <h1 className='title'>&nbsp;</h1>
                            <h3 className='subtitle'>Ingredients:</h3>

                            <ul>
                                {ingredients}
                            </ul>

                        </div>
                    </div>
                </section>
            </div>

            <div id={'directions-column'} className={'column'}>
                <section className={"section"}>
                    <div className={"container"}>
                        <div key={recipe.name}>
                            <h1 className='title'>{recipe.name}</h1>
                            <h3 className='subtitle'>Cooking Time: {recipe["Cooking Time"]} - Difficulty: {recipe.difficulty}</h3>

                            <hr />
                            <h3 className={'subtitle'}>Directions:</h3>
                            <p>{directions}</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Recipe;