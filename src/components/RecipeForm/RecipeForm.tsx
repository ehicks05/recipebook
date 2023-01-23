import React from "react";
import { useRouter } from "next/router";

import { HiPlus, HiMinus } from "react-icons/hi";
import { Container, Button, Hero, T } from "components/core";
import EmojiSelector from "./components/EmojiSelector";
import {
  DEFAULT_RECIPE,
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  UNIT_OPTIONS,
  RECIPE_SCHEMA,
} from "./constants";
import {
  MyHiddenInput,
  MyInput,
  MySelect,
  MyTextArea,
} from "./components/StyledInputs";
import { api } from "utils/api";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function RecipeForm() {
  // const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    getValues,
  } = useForm({
    defaultValues: DEFAULT_RECIPE,
    resolver: zodResolver(RECIPE_SCHEMA),
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   console.log("formData", data);
    //   console.log(
    //     "validation result",
    //     await zodResolver(RECIPE_SCHEMA)(data, context, options)
    //   );
    //   return zodResolver(RECIPE_SCHEMA)(data, context, options);
    // },
  });
  console.log({ a: getValues(), errors });
  // const { fields } = useFieldArray({ name: "todo" });

  // const { isLoading, isError, error, data } = api.example.findRecipe.useQuery({
  //   id: (id as string) || "",
  // });

  // if (isLoading) return <Hero title="Loading..." />;
  // if (isError) return <Hero title="Error..." subtitle={error.message} />;
  // const recipe = id ? data : undefined;
  const recipe = undefined;
  // if (id && !recipe) return <Hero title="Recipe not found" />;

  const submit = () => {
    // useMutation
    // invalidate existing query
    // navigate to recipe if relavent
    return;
  };

  return (
    <>
      <Hero title={`${recipe ? "Edit" : "Create"} Recipe`} />
      <Container>
        <form onSubmit={() => handleSubmit(submit)}>
          <div className="text-right">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
              className={`${isSubmitting ? "is-loading" : ""}`}
            >
              {`${recipe ? "Save" : "Create Recipe "}`}
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
              <T className="text-lg font-semibold">Recipe Details</T>

              <MyInput
                label="Name"
                placeholder="Name"
                register={register}
                name="name"
                error={errors.name}
              />
              <MyTextArea
                name="description"
                label="Description"
                placeholder="Description"
              />

              <div className="flex gap-2">
                {/* <MyInput
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
                </MySelect> */}
              </div>
              {/* <div className="flex flex-col gap-1">
                <label className="label">
                  <T>Emoji</T>
                </label>
                <div className="control">
                  <EmojiSelector
                    data={{ value: values.emoji }}
                    updateEmoji={(code) => setFieldValue("emoji", code)}
                  />
                </div>
              </div> */}
            </div>
            {/* <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
              <T className="text-lg font-semibold">Ingredients</T>
              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div className="flex flex-col gap-6">
                    {values.ingredients.map((ingredient, index) => (
                      <div
                        key={ingredient.index}
                        className="flex flex-col gap-2"
                      >
                        <MyHiddenInput name={`ingredients.${index}.index`} />
                        <div className="flex items-start gap-2">
                          <MyInput
                            name={`ingredients.${index}.quantity`}
                            placeholder="Quantity"
                          />
                          <MySelect name={`ingredients.${index}.unit`}>
                            {UNIT_OPTIONS}
                          </MySelect>
                          <Button
                            onClick={(e) => {
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
                            // index: values.ingredients.length,
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
            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
              <T className="text-lg font-semibold">Directions</T>
              <FieldArray name="directions">
                {({ remove, push }) => (
                  <div className="flex flex-col gap-6">
                    {values.directions.map((direction, index) => (
                      <div
                        key={direction.index}
                        className="flex items-start gap-2"
                      >
                        <T className="pr-2">{index + 1}.</T>
                        <MyHiddenInput name={`directions.${index}.index`} />
                        <MyTextArea
                          name={`directions.${index}.text`}
                          placeholder="Description"
                        />
                        <Button
                          onClick={(e) => {
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
            </div> */}
          </div>
        </form>
      </Container>
    </>
  );
}

export default RecipeForm;
