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
    control,
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitting, isValid, touchedFields },
    getValues,
  } = useForm({
    defaultValues: DEFAULT_RECIPE,
    mode: "all",
    resolver: zodResolver(RECIPE_SCHEMA),
  });
  const ingredientsFieldArray = useFieldArray({ control, name: "ingredients" });
  const directionsFieldArray = useFieldArray({ control, name: "directions" });
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
  console.log({ formState });

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
                name="name"
                label="Name"
                placeholder="Name"
                register={register}
                error={errors.name}
              />
              <MyTextArea
                name="description"
                label="Description"
                placeholder="Description"
                register={register}
                error={errors.description}
              />

              <div className="flex gap-2">
                <MyInput
                  containerClassName=""
                  type="string"
                  name="cookingTime"
                  label="Time"
                  placeholder="Minutes"
                  min="1"
                  register={register}
                  error={errors.cookingTime}
                />
                <MyInput
                  type="number"
                  name="servings"
                  label="Serves"
                  placeholder="Servings"
                  min="1"
                  register={register}
                  error={errors.servings}
                />
                <MySelect
                  label="Difficulty"
                  name="difficulty"
                  register={register}
                  error={errors.difficulty}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </MySelect>
              </div>
              <div className="flex flex-col gap-1">
                <MyInput
                  name="emoji"
                  label="Emoji"
                  placeholder="Emoji"
                  register={register}
                  error={errors.emoji}
                />
                {/* <label className="label">
                  <T>Emoji</T>
                </label>
                <div className="control">
                  <EmojiSelector
                    data={{ value: values.emoji }}
                    updateEmoji={(code) => setFieldValue("emoji", code)}
                  />
                </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
              <T className="text-lg font-semibold">Ingredients</T>
              {ingredientsFieldArray.fields.map((field, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <MyHiddenInput name={`ingredients.${index}.index`} />
                  <div className="flex items-start gap-2">
                    <MyInput
                      name={`ingredients.${index}.quantity`}
                      placeholder="Quantity"
                      register={register}
                    />
                    <MySelect
                      name={`ingredients.${index}.unit`}
                      register={register}
                    >
                      {UNIT_OPTIONS}
                    </MySelect>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        ingredientsFieldArray.remove(index);
                      }}
                    >
                      <HiMinus />
                    </Button>
                  </div>
                  <MyInput
                    name={`ingredients.${index}.name`}
                    placeholder="Name"
                    register={register}
                  />
                </div>
              ))}
              <div>
                <Button
                  onClick={() =>
                    ingredientsFieldArray.append({
                      ...DEFAULT_INGREDIENT,
                      // index: values.ingredients.length,
                    })
                  }
                >
                  <HiPlus />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
              <T className="text-lg font-semibold">Directions</T>
              <div className="flex flex-col gap-6">
                {directionsFieldArray.fields.map((direction, index) => (
                  <div key={direction.index} className="flex items-start gap-2">
                    <T className="pr-2">{index + 1}.</T>
                    <MyHiddenInput name={`directions.${index}.index`} />
                    <MyTextArea
                      name={`directions.${index}.text`}
                      placeholder="Description"
                      register={register}
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        directionsFieldArray.remove(index);
                      }}
                    >
                      <HiMinus />
                    </Button>
                  </div>
                ))}
                <div>
                  <Button
                    onClick={() =>
                      directionsFieldArray.append({
                        ...DEFAULT_DIRECTION,
                        // index: values.directions.length,
                      })
                    }
                  >
                    <HiPlus />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}

export default RecipeForm;
