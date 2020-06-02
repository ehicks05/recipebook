import React, {useReducer, useState} from "react";

function RecipeForm(props)
{

    // RECIPE

    const initialRecipeState = {
        name: '',
        description: '',
        emoji: ':)',
        difficulty: 1,
        cookingTime: 1,
        servings: 1,
        directions: [{index: '', text: ''}],
    };

    function reducer (state, {field, value}) {
        return {
            ...state,
            [field]: value
        }
    }

    const [recipeState, dispatch] = useReducer(reducer, initialRecipeState);

    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value});
    }

    const {name, description, emoji, difficulty, cookingTime, servings} = recipeState;

    // INGREDIENTS

    const blankIngredient = {name: '', quantity: '', unit: ''}
    const [ingredients, setIngredients] = useState([blankIngredient]);

    function addBlankIngredient()
    {
        const copy = [...ingredients]
        copy.push(blankIngredient)
        setIngredients(copy)
    }

    function updateIngredient(e) {
        const name = e.target.name;
        const value = e.target.value;

        const parts = name.split('_');
        const field = parts[1]
        const index = parts[2]

        const copy = [...ingredients]
        copy[index][field] = value

        setIngredients(copy)
    }

    function removeIngredient(e) {
        const field = e.target.name;

        const index = field.substring(field.lastIndexOf('_') + 1)

        const copy = [...ingredients]
        copy.splice(index, 1)
        setIngredients(copy)
    }

    return (
        <>
            <section className={"hero is-info"}>
                <div className={"hero-body"}>
                    <div className={"container"}>
                        <h1 className='title'>Create a Recipe</h1>
                    </div>
                </div>
            </section>
            <div className='container'>
                <div style={{maxWidth: '500px'}}>

                    <div className='box'>
                        <h2 className='subtitle'>Recipe Details</h2>

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" name='name' placeholder='Name' value={name} onChange={onChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea" name='description' placeholder="Description" value={description} onChange={onChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Difficulty</label>
                            <div className="control">
                                <div className='select'>
                                    <select name='difficulty' value={difficulty} onChange={onChange}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Cooking Time</label>

                            <div className='control'>
                                <div className='field has-addons'>
                                    <div className="control is-expanded">
                                        <input className="input is-fullwidth" type="number" step='1' min='1' name='cookingTime' placeholder="1" value={cookingTime} onChange={onChange} />
                                    </div>
                                    <div className="control">
                                        <button className="button is-static">
                                            minutes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Servings</label>
                            <div className="control">
                                <input className="input" type="number" step='1' min='1' name='servings' placeholder="1" value={servings} onChange={onChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Emoji</label>
                            <div className="control">
                                <input className="input" type="text" maxLength={1} name='emoji' placeholder="" value={emoji} onChange={onChange} />
                            </div>
                        </div>
                    </div>

                    <div className='box'>
                        <h2 className='subtitle'>Ingredients</h2>
                        {
                            ingredients.map((ingredient, i) => {
                                return (
                                    <IngredientForm ingredient={ingredient} i={i} updateIngredient={updateIngredient} removeIngredient={removeIngredient}/>
                                );
                            })
                        }

                        <button className='button is-success is-light' onClick={addBlankIngredient}>Add Ingredient</button>
                    </div>

                </div>
            </div>
        </>
    );
}

function IngredientForm(props) {
    const ingredient = props.ingredient;
    const i = props.i;
    const updateIngredient = props.updateIngredient;
    const removeIngredient = props.removeIngredient;

    return (
        <div className='field has-addons' key={i}>
            <div className="control is-expanded">
                <input className="input is-fullwidth" type="text" name={`ingredient_name_${i}`}
                       placeholder="Name" value={ingredient.name} onChange={updateIngredient} />
            </div>
            <div className="control">
                <input className="input" type="number" maxLength={5} min='1' name={`ingredient_quantity_${i}`}
                       placeholder="Quantity" value={ingredient.quantity} onChange={updateIngredient} />
            </div>
            <div className="control">
                <div className='select'>
                    <select name={`ingredient_unit_${i}`} value={ingredient.unit} onChange={updateIngredient}>
                        <option value='' />
                        <option value='oz'>oz</option>
                        <option value='lb'>lb</option>
                        <option value='ml'>ml</option>
                        <option value='L'>L</option>
                        <option value='g'>g</option>
                    </select>
                </div>
            </div>
            <div className='control'>
                <input type='button' name={`ingredient_delete_${i}`} className='button is-danger is-light' value='X' onClick={removeIngredient} />
            </div>
        </div>
    );
}

export default RecipeForm;