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
import { HiEye, HiFolder, HiTrash } from "react-icons/hi";

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

  const utils = api.useContext();
  const {
    mutate: createRecipe,
    isLoading: isCreateRecipeLoading,
    error: createRecipeError,
  } = api.example.createRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await utils.example.findRecipes.invalidate();
      await router.push(`/recipe/${data.id}`);
    },
  });

  const {
    mutate: updateRecipe,
    isLoading: isUpdateRecipeLoading,
    error: updateRecipeError,
    isSuccess: isUpdateRecipeSuccess,
  } = api.example.updateRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await utils.example.findRecipe.invalidate();
      // await router.push(`/recipe/${data.id}`);
    },
  });

  const {
    mutate: deleteRecipe,
    isLoading: isDeleteRecipeLoading,
    error: deleteRecipeError,
  } = api.example.deleteRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await utils.example.findRecipes.invalidate();
      await router.push(`/create-recipe`);
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<FormRecipe> = (data, e) => {
    e?.preventDefault();
    console.log({ data });
    recipe ? updateRecipe({ ...data, id: recipe.id }) : createRecipe(data);
  };

  const onError: SubmitErrorHandler<FormRecipe> = (errors, e) => {
    e?.preventDefault();
    console.log({ errors });
  };

  const isLoading =
    isSubmitting ||
    isCreateRecipeLoading ||
    isUpdateRecipeLoading ||
    isDeleteRecipeLoading;

  const error = createRecipeError || updateRecipeError;

  return (
    <>
      <Hero title={`${recipe ? "Edit" : "Create"} Recipe`} />
      {error && (
        <div className="m-3">
          <Alert
            variant="error"
            title={`Unable to ${recipe ? "update" : "create"} recipe`}
            description={error.message}
          />
        </div>
      )}
      {isUpdateRecipeSuccess && (
        <div className="m-3">
          <Alert
            variant="success"
            title={`Successfully updated recipe`}
            description={"Nice!"}
          />
        </div>
      )}
      <Container>
        {/* https://github.com/react-hook-form/react-hook-form/discussions/8020 */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
          <div className="mt-4 space-x-4 text-right">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!isValid || isLoading}
            >
              {`${recipe ? "Save" : "Create Recipe "}`}
              <HiFolder />
            </Button>
            {recipe && (
              <>
                <Button
                  onClick={() => void router.push(`/recipe/${recipe.id}`)}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  View
                  <HiEye />
                </Button>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-red-600 text-white dark:bg-red-800"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Delete
                  <HiTrash />
                </Button>
              </>
            )}
          </div>
        </form>
      </Container>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        body={
          <>
            {deleteRecipeError && (
              <Alert
                variant="error"
                title="Unable to delete recipe"
                description={deleteRecipeError.message}
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
            className="bg-red-600 text-white dark:bg-red-800"
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
