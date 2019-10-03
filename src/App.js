import React from 'react';
import recipeData from './recipes.json';
import Recipe from './components/Recipe';
import RecipePicker from './components/RecipePicker';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickRecipe = this.handleClickRecipe.bind(this);

        this.state = {
            recipes: recipeData,
            selectedRecipeId: 1
        }
    }

    handleClickRecipe(id) {
        this.setState({selectedRecipeId: id});
    }

    render() {
        var recipe;
        if (this.state.selectedRecipeId) {
            var recipe1 = recipeData.find(el => el.id === this.state.selectedRecipeId);
            console.log(recipeData);
            recipe = <Recipe recipe={recipe1}/>
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

                <div className={'columns'}>
                    <div className={'column is-one-fifth'}>
                        <section className={"section"}>
                            <RecipePicker onClickRecipe={this.handleClickRecipe} currentlySelected={this.state.selectedRecipeId} recipes={recipeData}/>
                        </section>
                    </div>
                    <div className={'column'}>
                        <section className={"section"}>
                            <div className={"container"}>
                                {recipe}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}