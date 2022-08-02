import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useQueryClient } from 'react-query';

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
import T from '../../components/T';

interface IProps {
  recipes?: IRecipe[];
}

function RecipeForm({ recipes }: IProps) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const recipe = id ? recipes?.find(r => r.id === id) : undefined;

  if (id && !recipe) return <div>Loading...</div>;

  return (
    <>
      <Hero title={`${recipe ? 'Edit' : 'Create'} Recipe`} />
      <Container>
        <Formik
          initialValues={recipe || DEFAULT_RECIPE}
          validationSchema={RECIPE_SCHEMA}
          onSubmit={async (values, { setSubmitting }) => {
            const path = recipe ? `/api/recipe/${recipe.id}` : '/api/recipe';
            const method = 'POST';
            const response = await authFetch(path, {
              method,
              body: values,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            await queryClient.invalidateQueries('/api/recipes');
            setSubmitting(false);
            if (!recipe) navigate(`/edit-recipe/${response.id}`);
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
              <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-8">
                <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-2">
                  <T className="text-lg font-semibold">Recipe Details</T>

                  <MyInput label="Name" name="name" placeholder="Name" />
                  <MyTextArea
                    name="description"
                    label="Description"
                    placeholder="Description"
                  />

                  <div className="flex gap-2">
                    <MyInput
                      containerClassName=""
                      type="string"
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
                    <label className="label">
                      <T>Emoji</T>
                    </label>
                    <div className="control">
                      <EmojiSelector
                        data={{ value: values.emoji }}
                        updateEmoji={code => setFieldValue('emoji', code)}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1 lg:col-span-2">
                  <T className="text-lg font-semibold">Ingredients</T>
                  <FieldArray name="ingredients">
                    {({ remove, push }) => (
                      <div className="flex flex-col gap-6">
                        {values.ingredients.map((ingredient, index) => (
                          <div
                            key={ingredient.index}
                            className="flex flex-col gap-2"
                          >
                            <MyHiddenInput
                              name={`ingredients.${index}.index`}
                            />
                            <div className="flex gap-2 items-start">
                              <MyInput
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
                                <FaMinus />
                              </Button>
                            </div>
                            <MyInput
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
                                // index: values.ingredients.length,
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
                <div className="md:col-span-2 lg:col-span-3">
                  <T className="text-lg font-semibold">Directions</T>
                  <FieldArray name="directions">
                    {({ remove, push }) => (
                      <div className="flex flex-col gap-6">
                        {values.directions.map((direction, index) => (
                          <div
                            key={direction.index}
                            className="flex gap-2 items-start"
                          >
                            <T className="pr-2">{index + 1}.</T>
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
                              <FaMinus />
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
