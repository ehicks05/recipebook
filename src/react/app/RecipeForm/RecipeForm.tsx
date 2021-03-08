import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/all';

import { FieldArray, Form, Formik } from 'formik';
import Hero from '../../components/Hero';
import EmojiSelector from './Components/EmojiSelector';
import authFetch from '../../authFetch';
import {
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
  UNIT_OPTIONS,
  RECIPE_SCHEMA,
} from './constants';
import {
  MyHiddenInput,
  MyInput,
  MySelect,
  MyTextArea,
} from '../../components/FormikInput';
import { IRecipe } from '../../types/types';

interface IProps {
  fetchRecipes: () => void;
  recipes?: IRecipe[];
}

function RecipeForm({ fetchRecipes, recipes }: IProps) {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const recipe = id ? recipes?.find(r => r.id === Number(id)) : undefined;

  if (id && !recipe) return <div>Loading...</div>;

  return (
    <>
      <Hero title={`${recipe ? 'Edit' : 'Create'} Recipe`} />
      <div className="section">
        <div className="container">
          <Formik
            initialValues={recipe || DEFAULT_RECIPE}
            validationSchema={RECIPE_SCHEMA}
            onSubmit={(values, { setSubmitting }) => {
              const path = recipe ? `/recipe/${recipe.id}` : '/recipe';
              const method = recipe ? 'PUT' : 'POST';
              authFetch(path, {
                method,
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then(response => {
                fetchRecipes();
                setSubmitting(false);
                history.push(`/recipe/${response.id}`);
              });
            }}
          >
            {({ values, setFieldValue, isValid, isSubmitting }) => (
              <Form>
                <div className="columns">
                  <div className="column is-one-third">
                    <div className="">
                      <h2 className="subtitle is-4">Recipe Details</h2>

                      <MyInput label="Name" name="name" placeholder="Name" />
                      <MyTextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                      />

                      <div className="columns is-mobile is-variable is-1 is-multiline">
                        <div className="column is-half">
                          <MyInput
                            type="number"
                            name="cookingTime"
                            label="Time"
                            placeholder="Minutes"
                            min="1"
                          />
                        </div>
                        <div className="column is-half">
                          <MyInput
                            type="number"
                            name="servings"
                            label="Servings"
                            placeholder="Servings"
                            min="1"
                          />
                        </div>
                        <div className="column">
                          <div className="field">
                            <label className="label">Emoji</label>
                            <div className="control">
                              <EmojiSelector
                                data={{ value: values.emoji }}
                                updateEmoji={code => setFieldValue('emoji', code)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="column is-narrow">
                          <MySelect label="Difficulty" name="difficulty">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </MySelect>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="">
                      <h2 className="subtitle is-4">Ingredients</h2>
                      <FieldArray name="ingredients">
                        {({ remove, push }) => (
                          <div>
                            {values.ingredients.length > 0 &&
                              values.ingredients.map((ingredient, index) => (
                                <>
                                  {index !== 0 && <hr />}
                                  <div
                                    key={index}
                                    className="columns is-mobile is-variable is-1"
                                  >
                                    <div className="column is-narrow">
                                      <div className="control">
                                        <input
                                          type="text"
                                          className="input is-static"
                                          readOnly
                                          value={`${index + 1}.`}
                                          style={{
                                            textAlign: 'right',
                                            width: '1.35rem',
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="column">
                                      <MyInput
                                        name={`ingredients.${index}.name`}
                                        placeholder="Name"
                                      />
                                      <div className="columns is-mobile is-variable is-0">
                                        <div className="column">
                                          <MyInput
                                            name={`ingredients.${index}.quantity`}
                                            placeholder="Quantity"
                                            isExpanded
                                          />
                                        </div>
                                        <div className="column is-narrow">
                                          <MySelect
                                            name={`ingredients.${index}.unit`}
                                          >
                                            {UNIT_OPTIONS}
                                          </MySelect>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="column is-narrow">
                                      <button
                                        className="delete has-background-danger"
                                        onClick={e => {
                                          e.preventDefault();
                                          remove(index);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </>
                              ))}
                            <button
                              className="button is-success"
                              onClick={() => push(DEFAULT_INGREDIENT)}
                            >
                              <span className="icon">
                                <FaPlus />
                              </span>
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div className="column">
                    <div className="">
                      <h2 className="subtitle is-4">Directions</h2>
                      <FieldArray name="directions">
                        {({ remove, push }) => (
                          <div>
                            {values.directions.length > 0 &&
                              values.directions.map((direction, index) => (
                                <div
                                  key={index}
                                  className="columns is-mobile is-variable is-1"
                                >
                                  <div className="column is-narrow">
                                    <div className="control">
                                      <input
                                        type="text"
                                        className="input is-static"
                                        readOnly
                                        value={`${index + 1}.`}
                                        style={{
                                          textAlign: 'right',
                                          width: '1.35rem',
                                        }}
                                      />
                                    </div>
                                    <MyHiddenInput
                                      name={`directions.${index}.index`}
                                    />
                                  </div>
                                  <div className="column">
                                    <MyTextArea
                                      name={`directions.${index}.text`}
                                      placeholder="Description"
                                    />
                                  </div>
                                  <div className="column is-narrow">
                                    <button
                                      className="delete has-background-danger"
                                      onClick={e => {
                                        e.preventDefault();
                                        remove(index);
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            <button
                              className="button is-success"
                              onClick={() =>
                                push({
                                  ...DEFAULT_DIRECTION,
                                  index: values.directions.length,
                                })
                              }
                            >
                              <span className="icon">
                                <FaPlus />
                              </span>
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <button
                        disabled={!isValid || isSubmitting}
                        className={`button is-success ${
                          isSubmitting ? 'is-loading' : ''
                        }`}
                      >
                        {`${recipe ? 'Save Changes' : 'CreateRecipe '}`}
                      </button>
                    </div>
                  </div>
                </nav>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default RecipeForm;
