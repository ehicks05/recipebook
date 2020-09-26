import React, { ChangeEvent, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { IDirection, IIngredient, IRecipe } from "./types";

interface IProps {
  fetchRecipes: () => void;
}

const initialIngredientState: IIngredient = {
  name: "",
  quantity: "0",
  unit: "",
};
const initialDirectionState: IDirection = { index: "", text: "" };
const initialRecipeState: IRecipe = {
  name: "",
  description: "",
  emoji: ":)",
  difficulty: 1,
  cookingTime: "1",
  servings: 1,
  ingredients: [initialIngredientState],
  directions: [initialDirectionState],
};

function RecipeForm(props: IProps) {
  let history = useHistory();

  // RECIPE
  function reducer(
    state: IRecipe,
    { field, value }: { field: string; value: string | number | IDirection[] }
  ): IRecipe {
    return {
      ...state,
      [field]: value,
    };
  }

  const [recipeState, dispatch] = useReducer(reducer, initialRecipeState);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const {
    name,
    description,
    emoji,
    difficulty,
    cookingTime,
    servings,
  } = recipeState;

  // INGREDIENTS
  const [ingredients, setIngredients] = useState<IIngredient[]>([
    { ...initialIngredientState },
  ]);

  function addBlankIngredient() {
    setIngredients([...ingredients, { ...initialIngredientState }]);
  }

  function updateIngredient(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const name = e.target.name;
    const value = e.target.value;

    const parts = name.split("_");
    const field = parts[1];
    const index = Number(parts[2]);

    const copy = [...ingredients];
    copy[index][field as keyof IIngredient] = value;

    setIngredients(copy);
  }

  function removeIngredient(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const field = e.currentTarget.name;

    const index = Number(field.substring(field.lastIndexOf("_") + 1));

    const copy = [...ingredients];
    copy.splice(index, 1);
    setIngredients(copy);
  }

  // DIRECTIONS
  const [directions, setDirections] = useState<IDirection[]>([
    { ...initialDirectionState },
  ]);

  function addBlankDirection() {
    setDirections([...directions, { ...initialDirectionState }]);
  }

  function updateDirection(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    const parts = name.split("_");
    const field = parts[1];
    const index = Number(parts[2]);

    const copy = [...directions];
    copy[index][field as keyof IDirection] = value;

    setDirections(copy);
  }

  function removeDirection(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const field = e.currentTarget.name;

    const index = Number(field.substring(field.lastIndexOf("_") + 1));

    const copy = [...directions];
    copy.splice(index, 1);
    setDirections(copy);
  }

  function createRecipe() {
    let recipe = recipeState;
    recipe.ingredients = ingredients;
    recipe.directions = directions;

    fetch("/recipe", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let newlyCreatedId: number = response.id;
        props.fetchRecipes(); //to refresh the apps list of recipes, will also refresh side bar
        history.push("/recipe/" + newlyCreatedId);
      });
  }

  return (
    <>
      <section className={"hero is-info"}>
        <div className={"hero-body"}>
          <div className={"container"}>
            <h1 className="title">Create a Recipe</h1>
          </div>
        </div>
      </section>
      <div className="container">
        <div style={{ maxWidth: "500px" }}>
          <div className="box">
            <h2 className="subtitle">Recipe Details</h2>

            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Difficulty</label>
              <div className="control">
                <div className="select">
                  <select
                    name="difficulty"
                    value={difficulty}
                    onChange={onChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Cooking Time</label>

              <div className="control">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input is-fullwidth"
                      type="number"
                      step="1"
                      min="1"
                      name="cookingTime"
                      placeholder="1"
                      value={cookingTime}
                      onChange={onChange}
                    />
                  </div>
                  <div className="control">
                    <button className="button is-static">minutes</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Servings</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="1"
                  min="1"
                  name="servings"
                  placeholder="1"
                  value={servings}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Emoji</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  maxLength={1}
                  name="emoji"
                  placeholder=""
                  value={emoji}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="box">
            <h2 className="subtitle">Ingredients</h2>
            {ingredients.map((ingredient, i) => {
              return (
                <IngredientForm
                  ingredient={ingredient}
                  i={i}
                  updateIngredient={updateIngredient}
                  removeIngredient={removeIngredient}
                />
              );
            })}

            <button
              className="button is-success is-light"
              onClick={addBlankIngredient}
            >
              Add Ingredient
            </button>
          </div>

          <div className="box">
            <h2 className="subtitle">Directions</h2>
            {directions.map((direction, i) => {
              return (
                <DirectionForm
                  direction={direction}
                  i={i}
                  updateDirection={updateDirection}
                  removeDirection={removeDirection}
                />
              );
            })}

            <button
              className="button is-success is-light"
              onClick={addBlankDirection}
            >
              Add Direction
            </button>
          </div>
        </div>

        <button className="button is-success is-light" onClick={createRecipe}>
          Create Recipe
        </button>
      </div>
    </>
  );
}

interface IIngredientFormProps {
  ingredient: IIngredient;
  i: number;
  updateIngredient: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  removeIngredient: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

function IngredientForm(props: IIngredientFormProps) {
  const ingredient = props.ingredient;
  const i = props.i;
  const updateIngredient = props.updateIngredient;
  const removeIngredient = props.removeIngredient;

  return (
    <div className="field has-addons" key={i}>
      <div className="control is-expanded">
        <input
          className="input is-fullwidth"
          type="text"
          name={`ingredient_name_${i}`}
          placeholder="Name"
          value={ingredient.name}
          onChange={updateIngredient}
        />
      </div>
      <div className="control">
        <input
          className="input"
          type="number"
          maxLength={5}
          min="1"
          name={`ingredient_quantity_${i}`}
          placeholder="Quantity"
          value={ingredient.quantity}
          onChange={updateIngredient}
        />
      </div>
      <div className="control">
        <div className="select">
          <select
            name={`ingredient_unit_${i}`}
            value={ingredient.unit}
            onChange={updateIngredient}
          >
            <option value="" />
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="ml">ml</option>
            <option value="L">L</option>
            <option value="g">g</option>
          </select>
        </div>
      </div>
      <div className="control">
        <input
          type="button"
          name={`ingredient_delete_${i}`}
          className="button is-danger is-light"
          value="X"
          onClick={removeIngredient}
        />
      </div>
    </div>
  );
}

interface IDirectionFormProps {
  direction: { text: string };
  i: number;
  updateDirection: (e: ChangeEvent<HTMLInputElement>) => void;
  removeDirection: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

function DirectionForm(props: IDirectionFormProps) {
  const direction = props.direction;
  const i = props.i;
  const updateDirection = props.updateDirection;
  const removeDirection = props.removeDirection;

  return (
    <div className="field has-addons" key={i}>
      <div className="control is-expanded">
        <input
          className="input is-fullwidth"
          type="text"
          name={`direction_text_${i}`}
          placeholder="Description"
          value={direction.text}
          onChange={updateDirection}
        />
      </div>

      <div className="control">
        <input
          type="button"
          name={`direction_delete_${i}`}
          className="button is-danger is-light"
          value="X"
          onClick={removeDirection}
        />
      </div>
    </div>
  );
}

export default RecipeForm;
