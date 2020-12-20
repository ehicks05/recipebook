import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/all';
import Fraction from 'fraction.js';
import Hero from '../../components/Hero';
import EmojiSelector from './Components/EmojiSelector';
import { IDirection, IIngredient, IRecipe } from '../../types/types';
import authFetch from '../../authFetch';
import {
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
  UNIT_OPTIONS,
} from './constants';

interface IProps {
  fetchRecipes: () => void;
}

function fitToContent(e: React.FormEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLElement;
  target.style.height = '';
  target.style.height = `${target.scrollHeight + 2}px`;
}

function RecipeForm(props: IProps) {
  const history = useHistory();

  // RECIPE
  const [recipeState, setRecipeState] = useState(DEFAULT_RECIPE);

  function updateEmoji(code: string) {
    setRecipeState({ ...recipeState, ['emoji' as keyof IRecipe]: code });
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setRecipeState({
      ...recipeState,
      [e.target.name]: e.target.value,
    });
  };

  // INGREDIENTS
  const [ingredients, setIngredients] = useState([{ ...DEFAULT_INGREDIENT }]);

  function addDefaultIngredient() {
    setIngredients([...ingredients, { ...DEFAULT_INGREDIENT }]);
  }

  const [isInvalidQuantity, setIsInvalidQuantity] = useState(false);

  const isValid = (quantity: string) => {
    let isValid = false;
    try {
      console.log(`fraction.js says ${quantity} is ${new Fraction(quantity)}`);
      isValid = true;
    } catch (e) {
      // noop
    }
    return isValid;
  };

  function updateIngredient(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    const parts = name.split('_');
    const field = parts[1];
    const index = Number(parts[2]);

    const copy = [...ingredients];
    copy[index][field as keyof IIngredient] = value;

    setIngredients(copy);
    setIsInvalidQuantity(copy.some(ingredient => !isValid(ingredient.quantity)));
  }

  function removeIngredient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const field = e.currentTarget.name;

    const index = Number(field.substring(field.lastIndexOf('_') + 1));

    const copy = [...ingredients];
    copy.splice(index, 1);
    setIngredients(copy);
    setIsInvalidQuantity(copy.some(ingredient => !isValid(ingredient.quantity)));
  }

  // DIRECTIONS
  const [directions, setDirections] = useState([{ ...DEFAULT_DIRECTION }]);

  function addDefaultDirection() {
    setDirections([...directions, { ...DEFAULT_DIRECTION }]);
  }

  function updateDirection(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    const parts = name.split('_');
    const field = parts[1];
    const index = Number(parts[2]);

    const copy = [...directions];
    copy[index][field as keyof IDirection] = value;

    setDirections(copy);
  }

  function removeDirection(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const field = e.currentTarget.name;

    const index = Number(field.substring(field.lastIndexOf('_') + 1));

    const copy = [...directions];
    copy.splice(index, 1);
    setDirections(copy);
  }

  function createRecipe() {
    authFetch('/recipe', {
      method: 'POST',
      body: JSON.stringify({ ...recipeState, ingredients, directions }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const newlyCreatedId: number = response.id;
      props.fetchRecipes(); // to refresh the apps list of recipes, will also refresh side bar
      history.push(`/recipe/${newlyCreatedId}`);
    });
  }

  return (
    <>
      <Hero title="Create a Recipe" />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
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
                      value={recipeState.name}
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
                      rows={1}
                      value={recipeState.description}
                      onInput={fitToContent}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="columns is-mobile is-variable is-1 is-multiline">
                  <div className="column is-half">
                    <div className="field">
                      <label className="label">Time</label>

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
                              value={recipeState.cookingTime}
                              onChange={onChange}
                            />
                          </div>
                          <div className="control">
                            <button className="button px-1" disabled>
                              min
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column is-half">
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
                          value={recipeState.servings}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Emoji</label>
                      <div className="control">
                        <EmojiSelector
                          data={{ value: recipeState.emoji }}
                          updateEmoji={updateEmoji}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column is-narrow">
                    <div className="field">
                      <label className="label">Difficulty</label>
                      <div className="control">
                        <div className="select">
                          <select
                            name="difficulty"
                            value={recipeState.difficulty}
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
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <h2 className="subtitle">Ingredients</h2>
                {ingredients.map((ingredient, i) => (
                  <IngredientForm
                    ingredient={ingredient}
                    key={i} // ingredient.name will lose focus every time name changes
                    i={i}
                    updateIngredient={updateIngredient}
                    removeIngredient={removeIngredient}
                  />
                ))}

                <button className="button is-success" onClick={addDefaultIngredient}>
                  <span className="icon">
                    <FaPlus />
                  </span>
                </button>
              </div>

              <div className="box mt-6">
                <h2 className="subtitle">Directions</h2>
                {directions.map((direction, i) => (
                  <DirectionForm
                    direction={direction}
                    i={i}
                    key={direction.index}
                    updateDirection={updateDirection}
                    removeDirection={removeDirection}
                  />
                ))}

                <button className="button is-success" onClick={addDefaultDirection}>
                  <span className="icon">
                    <FaPlus />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                {isInvalidQuantity && (
                  <p className="has-text-danger">
                    Please check that ingredient quantities are all valid numbers
                  </p>
                )}
                <button
                  className="button is-success"
                  onClick={createRecipe}
                  disabled={isInvalidQuantity}
                >
                  Create Recipe
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

interface IIngredientFormProps {
  ingredient: IIngredient;
  i: number;
  updateIngredient: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  removeIngredient: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function IngredientForm(props: IIngredientFormProps) {
  const { ingredient } = props;
  const { i } = props;
  const { updateIngredient } = props;
  const { removeIngredient } = props;

  return (
    <div className="field is-grouped">
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
          style={{ width: '5em' }}
          type="text"
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
            {UNIT_OPTIONS}
          </select>
        </div>
      </div>
      <div className="control">
        <button
          name={`ingredient_delete_${i}`}
          className="button is-danger"
          onClick={removeIngredient}
        >
          <span className="icon">
            <FaMinus />
          </span>
        </button>
      </div>
    </div>
  );
}

interface IDirectionFormProps {
  direction: { text: string };
  i: number;
  updateDirection: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  removeDirection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function DirectionForm(props: IDirectionFormProps) {
  const { direction } = props;
  const { i } = props;
  const { updateDirection } = props;
  const { removeDirection } = props;

  return (
    <div className="field is-grouped" key={i}>
      <div className="control">
        <span>{`${i + 1}.`}</span>
      </div>
      <div className="control is-expanded">
        <textarea
          className="textarea"
          name={`direction_text_${i}`}
          placeholder="Description"
          rows={1}
          value={direction.text}
          onInput={fitToContent}
          onChange={updateDirection}
        />
      </div>

      <div className="control">
        <button
          name={`direction_delete_${i}`}
          className="button is-danger"
          onClick={removeDirection}
        >
          <span className="icon">
            <FaMinus />
          </span>
        </button>
      </div>
    </div>
  );
}

export default RecipeForm;
