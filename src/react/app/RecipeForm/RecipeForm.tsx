import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FaPlus, MdDelete } from 'react-icons/all';

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
        <div key={id} className="container">
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
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`button is-success ${
                      isSubmitting ? 'is-loading' : ''
                    }`}
                  >
                    {`${recipe ? 'Save' : 'Create Recipe '}`}
                  </button>
                </div>
                <div className="grid md:grid-cols-7 gap-4">
                  <div className="col-span-2 flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Recipe Details</h2>

                    <MyInput label="Name" name="name" placeholder="Name" />
                    <MyTextArea
                      name="description"
                      label="Description"
                      placeholder="Description"
                    />

                    <div className="flex">
                      <MyInput
                        type="number"
                        name="cookingTime"
                        label="Time"
                        placeholder="Minutes"
                        min="1"
                      />
                      <MyInput
                        type="number"
                        name="servings"
                        label="Serves"
                        placeholder="Servings"
                        min="1"
                      />
                      <MySelect label="Difficulty" name="difficulty">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </MySelect>
                    </div>
                    <div>
                      <label className="label">Emoji</label>
                      <div className="control">
                        <EmojiSelector
                          data={{ value: values.emoji }}
                          updateEmoji={code => setFieldValue('emoji', code)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <h2 className="text-lg font-semibold">Ingredients</h2>
                    <FieldArray name="ingredients">
                      {({ remove, push }) => (
                        <div className="flex flex-col gap-2">
                          {values.ingredients.map((ingredient, index) => (
                            <div key={ingredient.name} className="flex">
                              <MyInput
                                name={`ingredients.${index}.quantity`}
                                placeholder="Quantity"
                                isExpanded
                              />
                              <MySelect name={`ingredients.${index}.unit`}>
                                {UNIT_OPTIONS}
                              </MySelect>
                              <MyInput
                                name={`ingredients.${index}.name`}
                                placeholder="Name"
                              />
                              <button
                                type="button"
                                className="button"
                                onClick={e => {
                                  e.preventDefault();
                                  remove(index);
                                }}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          ))}
                          <div>
                            <button
                              type="button"
                              className="button is-success"
                              onClick={() => push(DEFAULT_INGREDIENT)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <div className="md:col-span-2">
                    <div className="">
                      <h2 className="text-lg font-semibold">Directions</h2>
                      <FieldArray name="directions">
                        {({ remove, push }) => (
                          <div className="flex flex-col gap-2">
                            {values.directions.map((direction, index) => (
                              <div key={direction.text} className="flex gap-2">
                                <div className="">
                                  <div className="control">{index + 1}.</div>
                                  <MyHiddenInput
                                    name={`directions.${index}.index`}
                                  />
                                </div>
                                <div className="">
                                  <MyTextArea
                                    name={`directions.${index}.text`}
                                    placeholder="Description"
                                  />
                                </div>
                                <div className="">
                                  <button
                                    type="button"
                                    className="button"
                                    onClick={e => {
                                      e.preventDefault();
                                      remove(index);
                                    }}
                                  >
                                    <MdDelete />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div>
                              <button
                                type="button"
                                className="button is-success"
                                onClick={() =>
                                  push({
                                    ...DEFAULT_DIRECTION,
                                    index: values.directions.length,
                                  })
                                }
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default RecipeForm;
