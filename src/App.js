import React from 'react';
import recipeData from './recipes.json';
import Recipe from './Recipe'

function App() {

    const recipes = recipeData.map(recipe => <Recipe key={recipe.name} recipe={recipe} /> );

    return (
        <div>
            <section className={"hero is-info"}>
                <div className={"hero-body"}>
                    <div className={"container"}>
                        <h1 className={"title"}>
                            Recipe Book
                        </h1>
                        <p className={"subtitle"}>
                            Bon appetite!
                        </p>
                    </div>
                </div>
            </section>

            <section className={"section"}>
                <div className={"container"}>
                    <ul>
                        {recipes}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default App;