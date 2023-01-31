"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "utils/api";
import { Container, Button, Hero, Alert, T, Dialog } from "components/core";
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
    isLoading: isCreateRecipeLoading,
    error: isCreateRecipeError,
  } = api.example.createRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await router.push(`/recipe/${data.id}`);
    },
  });

  const {
    mutate: deleteRecipe,
    isLoading: isDeleteRecipeLoading,
    error: isDeleteRecipeError,
  } = api.example.deleteRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await router.push(`/create-recipe`);
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<FormRecipe> = (data, e) => {
    e?.preventDefault();
    console.log({ data });
    createRecipe(data);
  };

  const onError: SubmitErrorHandler<FormRecipe> = (errors, e) => {
    e?.preventDefault();
    console.log({ errors });
  };

  const isLoading =
    isSubmitting || isCreateRecipeLoading || isDeleteRecipeLoading;

  return (
    <>
      <Hero title={`${recipe ? "Edit" : "Create"} Recipe`} />
      {isCreateRecipeError && (
        <div className="m-3">
          <Alert
            variant="error"
            title="Unable to create recipe"
            description={isCreateRecipeError.message}
          />
        </div>
      )}
      <Container>
        {/* https://github.com/react-hook-form/react-hook-form/discussions/8020 */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="text-right">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!isValid || isLoading}
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
        {recipe && (
          <div className="text-right">
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-red-600 dark:bg-red-600"
              loading={isLoading}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        )}
      </Container>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        body={
          <>
            {isDeleteRecipeError && (
              <Alert
                variant="error"
                title="Unable to delete recipe"
                description={isDeleteRecipeError.message}
              />
            )}
            <T>
              Are you sure you want to delete{" "}
              <span className="font-bold">{recipe?.name}</span>?
            </T>
          </>
        }
        footer={
          <Button
            onClick={() => deleteRecipe({ id: recipe?.id || "" })}
            className="bg-red-600 dark:bg-red-600"
            loading={isLoading}
            disabled={isLoading}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};

export default RecipeForm;
