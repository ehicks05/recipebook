import React from 'react';

export default class RecipePicker extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickRecipe = this.handleClickRecipe.bind(this);
    }

    handleClickRecipe(id) {
        console.log('recipe clicked');
        this.props.onClickRecipe(id);
    }

    render() {
        const recipeList = this.props.recipes.map(recipe => {
            if (recipe.id !== this.props.currentlySelected)
                return <li onClick={() => this.handleClickRecipe(recipe.id)} key={recipe.id}><button className={'button'}>{recipe.name}</button></li>
            else
                return <li key={recipe.id}><button className={'button is-info'}>{recipe.name}</button></li>
        });

        return(
            <div>
                <ul>
                    {recipeList}
                </ul>
            </div>
        )
    }
}