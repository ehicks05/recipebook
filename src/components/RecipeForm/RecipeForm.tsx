import React from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "utils/api";
import { Container, Button, Hero, T } from "components/core";
import EmojiSelector from "./components/EmojiSelector";
import { DEFAULT_RECIPE, RECIPE_SCHEMA } from "./constants";
import { MyInput, MySelect, MyTextArea } from "./components/StyledInputs";
import { IngredientsForm, DirectionsForm } from "./components";

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
            <IngredientsForm
              ingredientsFieldArray={ingredientsFieldArray}
              register={register}
            />
            <DirectionsForm
              directionsFieldArray={directionsFieldArray}
              register={register}
            />
          </div>
        </form>
      </Container>
    </>
  );
}

export default RecipeForm;
