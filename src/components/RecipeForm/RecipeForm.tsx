"use client";
import React, { useEffect, useState } from "react";
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
import { HiTrash } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface Props {
  recipe?: CompleteRecipe;
}

const RecipeForm = ({ recipe }: Props) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
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
      toast.custom((t) => (
        <Alert
          variant="success"
          title={`Recipe created!`}
          className={t.visible ? "animate-enter" : "animate-leave"}
        />
      ));
    },
  });

  const {
    mutate: updateRecipe,
    isLoading: isUpdateRecipeLoading,
    error: updateRecipeError,
  } = api.example.updateRecipe.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await utils.example.findRecipe.invalidate();
      reset(data, {});

      toast.custom((t) => (
        <Alert
          variant="success"
          title={`Recipe updated!`}
          className={t.visible ? "animate-enter" : "animate-leave"}
        />
      ));
    },
  });

  const {
    mutate: updatePublished,
    isLoading: isUpdatePublishedLoading,
    error: updatePublishedError,
  } = api.example.updatePublished.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      await utils.example.findRecipe.invalidate();

      toast.custom((t) => (
        <Alert
          variant="success"
          title={`Recipe ${data.isPublished ? "published" : "unpublished"}!`}
          className={t.visible ? "animate-enter" : "animate-leave"}
        />
      ));
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
      await router.push(`/`);
      toast.custom((t) => (
        <Alert
          variant="success"
          title={`Recipe deleted!`}
          className={t.visible ? "animate-enter" : "animate-leave"}
        />
      ));
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let id = "";
    if (isDirty) {
      id = toast.custom(
        (t) => (
          <Alert
            variant="info"
            title={`Unsaved changes`}
            className={`opacity-75 ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          />
        ),
        { duration: Infinity }
      );
    }
    if (!isDirty && id) {
      toast.dismiss(id);
    }

    return () => toast.dismiss(id);
  }, [isDirty]);

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
    isUpdatePublishedLoading ||
    isDeleteRecipeLoading;

  const error = createRecipeError || updateRecipeError || updatePublishedError;

  return (
    <>
      <Hero title={`${recipe ? "Edit" : "Create"} Recipe ${watch("emoji")}`} />
      {error && (
        <div className="m-3">
          <Alert
            variant="error"
            title={`Unable to ${recipe ? "update" : "create"} recipe`}
            description={error.message}
          />
        </div>
      )}
      <Container>
        {/* https://github.com/react-hook-form/react-hook-form/discussions/8020 */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <RecipeDetailsForm
              control={control}
              register={register}
              errors={errors}
            />
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
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!isValid || isLoading || (recipe && !isDirty)}
            >
              {`${recipe ? "Save" : "Create Recipe "}`}
            </Button>
            {recipe && (
              <>
                <Button
                  onClick={() => void router.push(`/recipe/${recipe.id}`)}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  View
                </Button>
                <Button
                  onClick={() =>
                    updatePublished({
                      id: recipe.id,
                      isPublished: !recipe.isPublished,
                    })
                  }
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {recipe.isPublished ? "Unpublish" : "Publish"}
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
          {/* TODO: consider removing */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {recipe && isDirty && (
              <div className="flex w-fit justify-center opacity-75">
                <Alert variant="info" title={`Unsaved changes`} />
              </div>
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
