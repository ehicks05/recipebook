import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Hero";
import { IRecipe } from "../../types/types";
import Directions from "./Components/Directions";
import Ingredients from "./Components/Ingredients";

interface IProps {
  recipes: IRecipe[];
}

function Recipe({ recipes }: IProps) {
  const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
  const [desiredServings, setDesiredServings] = useState(0);

  let location = useLocation();

  useEffect(() => {
    function getSelectedRecipe(id: number) {
      return recipes.find((item) => item.id === id);
    }

    const locationRecipeId = Number(location.pathname.replace("/recipe/", ""));
    const recipe = getSelectedRecipe(locationRecipeId);

    if (recipe) {
      setRecipe(recipe);
      setDesiredServings(recipe.servings);
    }
  }, [location, recipes]);

  if (!recipe) return <Hero title="Loading..." />;

  const title = `${recipe.name} ${recipe.emoji}`;
  const subtitle = `Cooking Time: ${recipe.cookingTime} - Difficulty: ${recipe.difficulty}`;

  return (
    <>
      <Hero title={title} subtitle={subtitle}>
        <p>
          by <b>{recipe.author.username}</b>
        </p>
      </Hero>
      <section className={"section"}>
        <div className={"container"}>
          <div className="columns is-centered">
            <div id={"ingredients-column"} className={"column is-one-quarter"}>
              <div key={recipe.name}>
                <h3 className="subtitle has-text-weight-bold">Ingredients</h3>
                <Ingredients
                  ingredients={recipe.ingredients}
                  defaultServings={recipe.servings}
                  desiredServings={desiredServings}
                  incrementServings={() =>
                    setDesiredServings(desiredServings + 1)
                  }
                  decrementServings={() =>
                    setDesiredServings(desiredServings - 1)
                  }
                />
              </div>
            </div>
            <div
              id={"directions-column"}
              className={"column"}
              style={{ maxWidth: "40em" }}
            >
              <div key={recipe.name}>
                <h3 className={"subtitle has-text-weight-bold"}>Directions</h3>
                <Directions directions={recipe.directions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Recipe;
