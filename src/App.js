import React from 'react';
import Component from 'react';
import recipeData from './recipes.json';
import Recipe from './components/Recipe';
import RecipePicker from './components/RecipePicker';

export default class App extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            recipes: recipeData,
            // selectedRecipeId: 1
        }
    }
    
    render() 
    {
        var recipe;
        if (this.state.selectedRecipeId) {
            var recipe1 = recipeData.find(el => el.id == this.state.selectedRecipeId)
            recipe = <Recipe recipe={recipe1} />
        }
        
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

                <RecipePicker currentlySelected={this.state.selectedRecipeId} recipes={recipeData} />

                <section className={"section"}>
                    <div className={"container"}>
                        {recipe}
                    </div>
                </section>
            </div>
            );  
        }
    }