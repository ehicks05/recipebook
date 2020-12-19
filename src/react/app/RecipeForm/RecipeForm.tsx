import React, { ChangeEvent, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/all';
import Hero from '../../components/Hero';
import EmojiSelector from './Components/EmojiSelector';
import { IDirection, IIngredient, IRecipe } from '../../types/types';
import authFetch from '../../authFetch';

interface IProps {
  fetchRecipes: () => void;
}

const initialIngredientState: IIngredient = {
  name: '',
  quantity: '0',
  unit: '',
};
const initialDirectionState: IDirection = { index: '', text: '' };
const initialRecipeState: IRecipe = {
  name: '',
  description: '',
  emoji: ':)',
  difficulty: 1,
  cookingTime: '1',
  servings: 1,
  course: '',
  author: { id: 0, username: 'unknown', displayName: 'Unknown' },
  createdBy: 0,
  ingredients: [initialIngredientState],
  directions: [initialDirectionState],
};

function fitToContent(e: React.FormEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLElement;
  target.style.height = '';
  target.style.height = `${target.scrollHeight + 2}px`;
}

function RecipeForm(props: IProps) {
  const history = useHistory();

  function updateEmoji(code: string) {
    dispatch({ field: 'emoji', value: code });
  }

  // RECIPE
  function reducer(
    state: IRecipe,
    { field, value }: { field: string; value: string | number | IDirection[] },
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
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const {
    name,
    description,
    difficulty,
    cookingTime,
    servings,
    emoji,
  } = recipeState;

  // INGREDIENTS
  const [ingredients, setIngredients] = useState<IIngredient[]>([
    { ...initialIngredientState },
  ]);

  function addBlankIngredient() {
    setIngredients([...ingredients, { ...initialIngredientState }]);
  }

  function updateIngredient(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { name } = e.target;
    const { value } = e.target;

    const parts = name.split('_');
    const field = parts[1];
    const index = Number(parts[2]);

    const copy = [...ingredients];
    copy[index][field as keyof IIngredient] = value;

    setIngredients(copy);
  }

  function removeIngredient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const field = e.currentTarget.name;

    const index = Number(field.substring(field.lastIndexOf('_') + 1));

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

  function updateDirection(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name } = e.target;
    const { value } = e.target;

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
    const recipe = recipeState;
    recipe.ingredients = ingredients;
    recipe.directions = directions;

    authFetch('/recipe', {
      method: 'POST',
      body: JSON.stringify(recipe),
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
                      rows={1}
                      value={description}
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
                              value={cookingTime}
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
                          value={servings}
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
                          data={{ value: emoji }}
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
                    key={ingredient.name}
                    i={i}
                    updateIngredient={updateIngredient}
                    removeIngredient={removeIngredient}
                  />
                ))}

                <button className="button is-success" onClick={addBlankIngredient}>
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

                <button className="button is-success" onClick={addBlankDirection}>
                  <span className="icon">
                    <FaPlus />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <nav className="level">
            <div className="level-item">
              <button className="button is-success" onClick={createRecipe}>
                Create Recipe
              </button>
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
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
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
            <option value="">unit</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="ml">ml</option>
            <option value="L">L</option>
            <option value="g">g</option>
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
  updateDirection: (e: ChangeEvent<HTMLTextAreaElement>) => void;
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
