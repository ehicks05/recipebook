import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

function RecipePicker(props) {

    const [recipeFilters, setRecipeFilters] = useState([]);
    const [usableRecipes, setUsableRecipes] = useState(props.recipes);

    // handle recipeFilters changing...
    useEffect(() => {
        getUsableRecipes();
    }, [recipeFilters]);

    function handleAddRecipeFilter() {
        const input = document.getElementById("recipeFilterInput");
        let newFilter = input.value.toLowerCase();
        if (newFilter.length > 1 && !recipeFilters.includes(newFilter)) {
            let filters = [...recipeFilters];
            filters.push(newFilter);
            setRecipeFilters(filters);
        }

        input.value = '';
    }

    function getUsableRecipes() {
        let recipes = props.recipes;

        if (recipeFilters.length > 0) {
            recipes = recipes.filter((recipe) => {
                let ingredients = recipe.ingredients.map(x => x.name.toLowerCase()).join();
                
                let keep = true;
                recipeFilters.forEach(element => {
                    if (!ingredients.includes(element)) {
                        keep =  false;
                    }
                });

                return keep;
            });
        }

        setUsableRecipes(recipes);
    }

    function handleClearRecipeFilter(filter) {
        let filters = [...recipeFilters];
        for (let i = 0; i < filters.length; i++)
            if (filters[i] === filter)
                filters.splice(i, 1);

        setRecipeFilters(filters);
    }

    function handleClearAllRecipeFilters() {
        setRecipeFilters([]);
    }

    return (
        <div style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: '0 1 auto', padding: '.5em .75em'}}>
                <div className="control">
                    <div className="field has-addons">
                        <div className="control">
                            <input id="recipeFilterInput" className="input is-small" type="text" placeholder="ingredient filter" />
                        </div>
                        <div className="control">
                            <button className={'button is-small'} onClick={() => handleAddRecipeFilter()}>
                                Add
                            </button>
                            {
                                recipeFilters.length > 0
                                    ? <button className={"button is-small"} onClick={() => handleClearAllRecipeFilters()}>Clear</button>
                                    : ''
                            }
                        </div>
                    </div>
                    {
                        recipeFilters.length > 0
                            ? recipeFilters.map(f =>
                                <span key={f} className={"tag is-link"}>
                                    {f} <button className={"delete"} onClick={() => handleClearRecipeFilter(f)}> </button>
                                 </span>)
                            : ''
                    }
                    <div className="tags">
                    </div>
                </div>
            </div>

            <aside className="menu" style={{height: '1px', flex: '1 1 auto', overflow: 'auto'}}>
                <ul className="menu-list">
                    <RecipeList
                        recipes={usableRecipes}
                    />
                </ul>
            </aside>
        </div>
    )
}

function RecipeList(props) {
    return props.recipes.map(recipe => {
        return <RecipeLink key={recipe.id} recipe={recipe} />;
    });
}

function RecipeLink(props) {
    const recipe = props.recipe;
    return (
        <li>
            <NavLink
                to={"/recipe/" + recipe.id}
                activeClassName="is-active"
            >
                <span className="panel-icon">
                    <span className="" aria-hidden="true">{recipe.emoji}</span>
                </span>
                {recipe.name}
            </NavLink>
        </li>
    );
}

export default RecipePicker;