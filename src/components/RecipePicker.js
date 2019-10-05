import React from 'react';
import recipeData from './recipes.json';

export default class RecipePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeFilters: []
        }

        this.handleClickRecipe = this.handleClickRecipe.bind(this);
        this.handleAddRecipeFilter = this.handleAddRecipeFilter.bind(this);
        this.handleClearRecipeFilter = this.handleClearRecipeFilter.bind(this);
        this.handleClearAllRecipeFilters = this.handleClearAllRecipeFilters.bind(this);
    }

    handleClickRecipe(id) {
        this.props.onClickRecipe(id);
    }

    handleAddRecipeFilter() {
        let input = document.getElementById("recipeFilterInput")
        if (input.value && input.value.length > 1) {
            let filter = input.value;
            let filters = this.state.recipeFilters;
            if (!filters.includes(filter.toLowerCase())) {
                filters.push(filter.toLowerCase());
                this.setState({
                    recipeFilters: filters
                });
            }
        }

        input.value = '';
    }

    handleClearRecipeFilter(filter) {
        let filters = this.state.recipeFilters;
        for (let i = 0; i < filters.length; i++)
            if (filters[i] == filter)
                filters.splice(i, 1);
        this.setState({ recipeFilters: filters });
    }

    handleClearAllRecipeFilters() {
        this.setState({ recipeFilters: [] });
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

        let clearFiltersButton = this.state.recipeFilters.length > 0
            ? <button onClick={() => this.handleClearAllRecipeFilters()}>Clear</button>
            : '';

        let filterList = this.state.recipeFilters.length > 0
            ? this.state.recipeFilters.map(f =>
                <span key={f} className={"tag is-link"}>
                    {f}
                    <button className={"delete"} onClick={() => this.handleClearRecipeFilter(f)}></button>
                </span>
            )
            : '';

        return (
            <nav className="panel">
                <p className="panel-heading">
                    Recipes
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input id="recipeFilterInput" className="input is-small" type="text" placeholder="search" />
                        {filterList}
                        <br />
                        <button onClick={() => this.handleAddRecipeFilter()}>Add</button>
                        {clearFiltersButton}
                        <span onClick={() => this.removeFilter(f)} className="icon is-small is-left">
                            <i className="fas fa-search" aria-hidden="true"> </i>
                        </span>
                    </p>
                </div>

                {recipeList}
            </nav>
        )
    }
}