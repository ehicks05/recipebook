import React, {useEffect, useState} from 'react';

function RecipePicker(props) {

    const [recipeFilters, setRecipeFilters] = useState([]);
    const [usableRecipes, setUsableRecipes] = useState(props.recipes);

    // if usableRecipes changes, and no longer contains the currently selected recipe,
    // change the currently selected recipe to the first usable recipe.
    useEffect(() => {
        if (!usableRecipes.map(it => it.id).includes(props.currentlySelected))
            if (usableRecipes.length > 0)
                handleClickRecipe(usableRecipes[0].id);
    }, [usableRecipes]);

    // handle recipeFilters changing...
    useEffect(() => {
        getUsableRecipes();
    }, [recipeFilters]);

    function handleClickRecipe(id) {
        const isSelected = id === props.currentlySelected;
        if (!isSelected)
            props.onClickRecipe(id);

        if (!props.mql.matches)
            props.onSetSidebarOpen(false);
    }

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

    let clearFiltersButton = recipeFilters.length > 0
        ? <button className={"button is-small"} onClick={() => handleClearAllRecipeFilters()}>Clear</button>
        : '';

    let filterList = recipeFilters.length > 0
        ? recipeFilters.map(f =>
            <span key={f} className={"tag is-link"}>
                {f}
                <button className={"delete"} onClick={() => handleClearRecipeFilter(f)}> </button>
            </span>
        )
        : '';

    let filters = filterList ?
        <div className="tags">{filterList}</div> : null;

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
                            {clearFiltersButton}
                        </div>
                    </div>

                    {filters}
                </div>
            </div>

            <aside className="menu" style={{height: '1px', flex: '1 1 auto', overflow: 'auto'}}>
                <ul className="menu-list">
                    <RecipeList
                        recipes={usableRecipes}
                        selectedRecipe={props.currentlySelected}
                        onClickRecipe={handleClickRecipe}
                    />
                </ul>
            </aside>
        </div>
    )
}

function RecipeList(props) {

    function getClass(recipe, currentlySelectedRecipe) {
        return recipe.id === currentlySelectedRecipe ? 'is-active' : null;
    }

    return props.recipes.map(recipe => {
        const activeClass = getClass(recipe, props.selectedRecipe);

        return (
            <li key={recipe.id} onClick={() => props.onClickRecipe(recipe.id)}>
                <a className={activeClass}>
                        <span className="panel-icon">
                            <span className="" aria-hidden="true">{recipe.emoji}</span>
                        </span>
                    {recipe.name}
                </a>
            </li>
        );
    });
}

export default RecipePicker;