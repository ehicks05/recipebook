import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { FieldArray, Form, Formik } from 'formik';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { Container, Button, Hero, T, Difficulty } from 'core-components';
import { useFetchRecipe } from 'hooks/recipes';
import EmojiSelector from './Components/EmojiSelector';
import authFetch from '../../helpers/authFetch';
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

function RecipeForm() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, error, data } = useFetchRecipe(id || '');

  if (isLoading) return <Hero title="Loading..." />;
  if (isError) return <Hero title="Error..." subtitle={error.message} />;
  const recipe = id ? data : undefined;
  if (id && !recipe) return <Hero title="Recipe not found" />;

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

                  <MyInput label="" name="name" placeholder="Name" />
                  <MyTextArea
                    name="description"
                    label=""
                    placeholder="Description"
                  />

                  <div className="flex gap-2">
                    <MyInput
                      containerClassName=""
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

                    <div className="flex flex-col gap-1">
                      <label className="label">
                        <T>Difficulty</T>
                      </label>
                      <Button
                        onClick={() =>
                          setFieldValue(
                            'difficulty',
                            (values.difficulty % 3) + 1
                          )
                        }
                      >
                        <Difficulty difficulty={values.difficulty} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
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
                <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-2">
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
                                <HiMinus />
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
                                index: values.ingredients.length,
                              })
                            }
                          >
                            <HiPlus />
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
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
                              <HiMinus />
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
                            <HiPlus />
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
