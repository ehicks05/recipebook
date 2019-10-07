import React from 'react';
import recipeData from './recipes.json';
import Recipe from './components/Recipe';
import RecipePicker from './components/RecipePicker';
import Navbar from "./components/Navbar";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickRecipe = this.handleClickRecipe.bind(this);

        this.state = {
            recipes: recipeData,
            selectedRecipeId: 1,
        }
    }

    handleClickRecipe(id) {
        this.setState({ selectedRecipeId: id });
    }

    render() {
        const selectedRecipe = recipeData.find(item => item.id === this.state.selectedRecipeId);

        return (
            <>
                <Navbar recipe={selectedRecipe} />
                <section className={"hero is-info"}>
                    <div className={"hero-body"}>
                        <div className={"container"}>
                            <h1 className='title'>{selectedRecipe.name}</h1>
                            <h3 className='subtitle'>Cooking Time: {selectedRecipe["Cooking Time"]} - Difficulty: {selectedRecipe.difficulty}</h3>
                        </div>
                    </div>
                </section>

                <section className={"section"}>
                    <div className={'container'}>
                        <div className={'columns'}>
                            <div className={'column is-one-quarter'}>
                                    <RecipePicker
                                        onClickRecipe={this.handleClickRecipe}
                                        currentlySelected={this.state.selectedRecipeId}
                                        recipes={recipeData} />
                            </div>

                            <Recipe recipe={selectedRecipe} />
                        </div>
                    </div>
                </section>
            </>
        );
    }
}