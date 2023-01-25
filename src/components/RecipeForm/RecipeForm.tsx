import React from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "utils/api";
import { Container, Button, Hero, T } from "components/core";
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
            <RecipeDetailsForm register={register} errors={errors} />
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
};

export default RecipeForm;
