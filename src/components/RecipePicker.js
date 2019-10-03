import React from 'react';

export default function RecipePicker(props) {

    const recipeList = props.recipes.map(it => {
        if (it.id == props.currentlySelected) {
            return <li key={it.id}>{it.name}</li>
        } else {
            return <li onClick={() => console.log('recipe clicked')} key={it.id}>{it.name}</li>
        }
    });

    return(
        <div>
            <ul>
                {recipeList}
            </ul>
        </div>
    )

}