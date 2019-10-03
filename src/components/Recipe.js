import React from "react";

function Recipe(props) {
    const recipe = props.recipe;
    const ingredients = recipe.ingredients.map(ingredient =>
        <li key={ingredient}>- {ingredient}</li>
    );

    return <div key={recipe.name}>
        <h1 className='title'>{recipe.name}</h1>
        <h3 className='subtitle'>Cooking Time: {recipe["Cooking Time"]} - Difficulty: {recipe.difficulty}</h3>

        <p>Ingredients:</p>
        <ul>
            {ingredients}
        </ul>

        <hr />
        <p>Directions:</p>
        <p>{recipe.directions}</p>
    </div>
}

export default Recipe;