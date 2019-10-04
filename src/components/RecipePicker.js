import React from 'react';

export default class RecipePicker extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickRecipe = this.handleClickRecipe.bind(this);
    }

    handleClickRecipe(id) {
        this.props.onClickRecipe(id);
    }

    render() {
        const recipeList = this.props.recipes.map(recipe => {
            const isSelected = recipe.id === this.props.currentlySelected;
            const activeClass = isSelected ? 'is-active' : null;
            return (
                <a className={"panel-block " + activeClass} key={recipe.id} onClick={isSelected ? null : () => this.handleClickRecipe(recipe.id)}>
                    <span className="panel-icon">
                      <span className="" aria-hidden="true">{recipe.emoji}</span>
                    </span>
                    {recipe.name}
                </a>
            );
        });

        return (
            <nav className="panel">
                <p className="panel-heading">
                    Recipes
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input className="input is-small" type="text" placeholder="search"/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-search" aria-hidden="true"> </i>
                        </span>
                    </p>
                </div>

                {recipeList}
            </nav>
        )
    }
}