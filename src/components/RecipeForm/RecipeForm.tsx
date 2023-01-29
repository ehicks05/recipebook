"use client";
import React from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "utils/api";
import { Container, Button, Hero, Alert } from "components/core";
import type { FormRecipe } from "./constants";
import { DEFAULT_RECIPE, RECIPE_SCHEMA } from "./constants";
import { IngredientsForm, DirectionsForm } from "./components";
import RecipeDetailsForm from "./components/RecipeDetailsForm";
import type { CompleteRecipe } from "server/api/routers/example";

interface Props {
  recipe?: CompleteRecipe;
}

const RecipeForm = ({ recipe }: Props) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: recipe || DEFAULT_RECIPE,
    mode: "all",
    resolver: zodResolver(RECIPE_SCHEMA),
  });
  const ingredientsFieldArray = useFieldArray({ control, name: "ingredients" });
  const directionsFieldArray = useFieldArray({ control, name: "directions" });

  const {
    mutate: createRecipe,
    isLoading,
    error,
  } = api.example.createRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await router.push(`/recipe/${data.id}`);
    },
  });

  const onSubmit: SubmitHandler<FormRecipe> = (data, e) => {
    e?.preventDefault();
    console.log({ data });
    createRecipe(data);
  };

  const onError: SubmitErrorHandler<FormRecipe> = (errors, e) => {
    e?.preventDefault();
    console.log({ errors });
  };

  return (
    <>
      <Hero title={`${recipe ? "Edit" : "Create"} Recipe`} />
      {error && (
        <Alert
          variant="error"
          title="Unable to create recipe"
          description={error.message}
        />
      )}
      <Container>
        {/* https://github.com/react-hook-form/react-hook-form/discussions/8020 */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="text-right">
            <Button
              type="submit"
              loading={isSubmitting || isLoading}
              disabled={!isValid || isSubmitting || isLoading}
            >
              {`${recipe ? "Save" : "Create Recipe "}`}
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <RecipeDetailsForm register={register} errors={errors} />
            <IngredientsForm
              ingredientsFieldArray={ingredientsFieldArray}
              register={register}
              errors={errors}
            />
            <DirectionsForm
              directionsFieldArray={directionsFieldArray}
              register={register}
              errors={errors}
            />
          </div>
        </form>
      </Container>
    </>
  );
};

export default RecipeForm;
