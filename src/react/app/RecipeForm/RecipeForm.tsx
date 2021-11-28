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
import Container from '../../components/Container';
import Button from '../../components/Button';

interface IProps {
  fetchRecipes: () => Promise<void>;
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
      <Container>
        <Formik
          initialValues={recipe || DEFAULT_RECIPE}
          validationSchema={RECIPE_SCHEMA}
          onSubmit={async (values, { setSubmitting }) => {
            const path = recipe ? `/recipe/${recipe.id}` : '/recipe';
            const method = recipe ? 'PUT' : 'POST';
            const response = await authFetch(path, {
              method,
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            await fetchRecipes();
            setSubmitting(false);
            if (!recipe) history.push(`/edit-recipe/${response.id}`);
          }}
        >
          {({ values, setFieldValue, isValid, isSubmitting }) => (
            <Form>
              <div className="text-right">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                  className={`${isSubmitting ? 'is-loading' : ''}`}
                >
                  {`${recipe ? 'Save' : 'Create Recipe '}`}
                </Button>
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
                      containerClassName=""
                      type="number"
                      name="cookingTime"
                      label="Time"
                      placeholder="Minutes"
                      min="1"
                    />
                    <MyInput
                      className="w-20"
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
                <div className="md:col-span-2">
                  <h2 className="text-lg font-semibold">Ingredients</h2>
                  <FieldArray name="ingredients">
                    {({ remove, push }) => (
                      <div className="flex flex-col gap-2">
                        {values.ingredients.map((ingredient, index) => (
                          <div key={ingredient.index} className="flex flex-col">
                            <MyHiddenInput
                              name={`ingredients.${index}.index`}
                            />
                            <div className="flex items-start">
                              <MyInput
                                className="w-20"
                                name={`ingredients.${index}.quantity`}
                                placeholder="Quantity"
                              />
                              <MySelect name={`ingredients.${index}.unit`}>
                                {UNIT_OPTIONS}
                              </MySelect>
                              <Button
                                onClick={e => {
                                  e.preventDefault();
                                  remove(index);
                                }}
                              >
                                <MdDelete />
                              </Button>
                            </div>
                            <MyInput
                              grow
                              name={`ingredients.${index}.name`}
                              placeholder="Name"
                            />
                          </div>
                        ))}
                        <div>
                          <Button
                            onClick={() =>
                              push({
                                ...DEFAULT_INGREDIENT,
                                index: values.ingredients.length,
                              })
                            }
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-lg font-semibold">Directions</h2>
                  <FieldArray name="directions">
                    {({ remove, push }) => (
                      <div className="flex flex-col gap-2">
                        {values.directions.map((direction, index) => (
                          <div key={direction.index} className="flex">
                            <div className="">{index + 1}.</div>
                            <MyHiddenInput name={`directions.${index}.index`} />
                            <MyTextArea
                              name={`directions.${index}.text`}
                              placeholder="Description"
                            />
                            <Button
                              onClick={e => {
                                e.preventDefault();
                                remove(index);
                              }}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        ))}
                        <div>
                          <Button
                            onClick={() =>
                              push({
                                ...DEFAULT_DIRECTION,
                                index: values.directions.length,
                              })
                            }
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default RecipeForm;
