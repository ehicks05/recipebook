import React, { useContext, useState } from "react";
import Link from "next/link";
import { BiDownload, BiEdit } from "react-icons/bi";
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
// import { UserContext } from "../../UserContext";
import { stripRecipe, updateClipboard } from "./utils";

interface IProps {
  recipe: CompleteRecipe;
}

function Recipe({ recipe }: IProps) {
  // const { user } = useContext(UserContext);
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
        <div className="grid grid-cols-1 justify-between gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div
            className="order-1 flex cursor-pointer flex-col gap-4"
            onClick={() => setIsShowDescription(!isShowDescription)}
          >
            <div className="flex gap-2">
              <CookingTime cookingTime={recipe.cookingTime} />
              <Difficulty difficulty={recipe.difficulty} />
            </div>
            {isShowDescription && <T>{recipe.description}</T>}
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
        <div className="flex gap-2 pt-4">
          {/* {user?.id === recipe.author.id && (
            <Link href={`/edit-recipe/${recipe.id}`} title="Edit Recipe">
              <Button>
                <BiEdit className="text-2xl" />
              </Button>
            </Link>
          )} */}
          <Button
            onClick={() =>
              updateClipboard(JSON.stringify(stripRecipe(recipe), null, 2))
            }
          >
            <BiDownload
              title="Copy to Clipboard"
              className="cursor-pointer text-2xl"
            />
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Recipe;
