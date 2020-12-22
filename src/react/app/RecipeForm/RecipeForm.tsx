import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/all';
import Fraction from 'fraction.js';
import * as Yup from 'yup';

import { FieldArray, Form, Formik } from 'formik';
import Hero from '../../components/Hero';
import EmojiSelector from './Components/EmojiSelector';
import authFetch from '../../authFetch';
import {
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
  UNIT_OPTIONS,
} from './constants';
import {
  MyHiddenInput,
  MyInput,
  MySelect,
  MyTextArea,
} from './Components/FormikInput';

interface IProps {
  fetchRecipes: () => void;
}

function RecipeForm(props: IProps) {
  const history = useHistory();

  const validateQuantity = (quantity: string | undefined) => {
    let isValid = false;
    try {
      console.log(
        `fraction.js says ${quantity} is ${quantity && new Fraction(quantity)}`,
      );
      isValid = true;
    } catch (e) {
      // noop
    }
    return isValid;
  };

  return (
    <>
      <Hero title="Create a Recipe" />
      <div className="section">
        <div className="container">
          <Formik
            initialValues={DEFAULT_RECIPE}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(30, 'Must be 15 characters or less')
                .required('Required'),
              description: Yup.string().required('Required'),
              cookingTime: Yup.number()
                .min(1, 'Must be at least 1')
                .required('Required'),
              servings: Yup.number()
                .min(1, 'Must be 1 serving or more')
                .required('Required'),
              emoji: Yup.string(),
              difficulty: Yup.number()
                .min(1, 'Must be at least 1')
                .max(5, 'Must be at most 5')
                .required('Required'),
              ingredients: Yup.array()
                .of(
                  Yup.object({
                    name: Yup.string().required('Required'),
                    quantity: Yup.string()
                      .test(
                        'is-valid-quantity',
                        'Must be a valid number',
                        validateQuantity,
                      )
                      .required('Required'),
                    unit: Yup.string(),
                  }),
                )
                .required('Required'),
              directions: Yup.array()
                .of(
                  Yup.object({
                    index: Yup.number().required('Required'),
                    text: Yup.string().required('Required'),
                  }),
                )
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              authFetch('/recipe', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then(response => {
                props.fetchRecipes();
                setSubmitting(false);
                history.push(`/recipe/${response.id}`);
              });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="columns">
                  <div className="column is-one-third">
                    <div className="box">
                      <h2 className="subtitle">Recipe Details</h2>

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
                    <div className="box">
                      <h2 className="subtitle">Ingredients</h2>
                      <FieldArray name="ingredients">
                        {({ remove, push }) => (
                          <div>
                            {values.ingredients.length > 0 &&
                              values.ingredients.map((ingredient, index) => (
                                <div key={index} className="field is-grouped">
                                  <MyInput
                                    name={`ingredients.${index}.name`}
                                    placeholder="Name"
                                  />
                                  <MyInput
                                    name={`ingredients.${index}.quantity`}
                                    placeholder="Quantity"
                                  />
                                  <MySelect name={`ingredients.${index}.unit`}>
                                    {UNIT_OPTIONS}
                                  </MySelect>

                                  <button
                                    className="button is-danger"
                                    onClick={() => remove(index)}
                                  >
                                    <span className="icon">
                                      <FaMinus />
                                    </span>
                                  </button>
                                </div>
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

                    <div className="box mt-6">
                      <h2 className="subtitle">Directions</h2>
                      <FieldArray name="directions">
                        {({ remove, push }) => (
                          <div>
                            {values.directions.length > 0 &&
                              values.directions.map((direction, index) => (
                                <div key={index} className="field is-grouped">
                                  <div className="control">
                                    <span>{`${index + 1}.`}</span>
                                  </div>
                                  <MyHiddenInput
                                    name={`directions.${index}.index`}
                                  />
                                  <MyTextArea
                                    name={`directions.${index}.text`}
                                    placeholder="Description"
                                  />

                                  <button
                                    className="button is-danger"
                                    onClick={() => remove(index)}
                                  >
                                    <span className="icon">
                                      <FaMinus />
                                    </span>
                                  </button>
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
                      <button className="button is-success">Create Recipe</button>
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
