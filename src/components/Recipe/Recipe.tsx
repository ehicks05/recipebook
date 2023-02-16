import React, { useState } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import {
  Button,
  Container,
  CookingTime,
  Difficulty,
  Hero,
  T,
} from "components/core";
import type { CompleteRecipe } from "server/api/routers/example";
import { Directions, Ingredients } from "./Components";
import { useUser } from "@supabase/auth-helpers-react";

interface IProps {
  recipe: CompleteRecipe;
}

function Recipe({ recipe }: IProps) {
  const user = useUser();
  const [scaledServings, setScaledServings] = useState(recipe.servings);
  const [isShowDescription, setIsShowDescription] = useState(true);

  return (
    <>
      <Hero title={`${recipe.name} ${recipe.emoji}`}>
        <T className="text-sm font-semibold">
          {recipe.author?.displayName || "todo"}
        </T>
      </Hero>
      <Container>
        <div className="grid grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="order-1 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <CookingTime cookingTime={recipe.cookingTime} />
              <Difficulty difficulty={recipe.difficulty} />{" "}
              {user?.id === recipe.author.id && (
                <Link href={`/edit-recipe/${recipe.id}`} title="Edit Recipe">
                  <Button className="text-sm font-semibold">
                    <HiPencilAlt className="text-2xl" />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsShowDescription(!isShowDescription)}
            >
              <T>{isShowDescription ? recipe.description : "Click to show"}</T>
            </div>
          </div>
          <div className="order-2 md:order-3">
            <Ingredients
              ingredients={recipe.ingredients}
              defaultServings={recipe.servings}
              scaledServings={scaledServings}
              setScaledServings={setScaledServings}
            />
          </div>
          <div className="order-3 sm:col-span-2 md:order-2">
            <Directions directions={recipe.directions} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Recipe;
