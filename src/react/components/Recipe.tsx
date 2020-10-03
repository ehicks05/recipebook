import React, { useEffect, useState } from "react";
import Timer from "../Timer";
import { create, all, MathJsStatic, Fraction } from "mathjs";
import { useLocation } from "react-router-dom";
import { IDirection, IIngredient, IRecipe } from "./types";

const math = create(all, {}) as MathJsStatic;

interface IProps {
  recipes: IRecipe[];
}

function Recipe(props: IProps) {
  const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
  const [desiredServings, setDesiredServings] = useState(0);

  let location = useLocation();

  useEffect(() => {
    function getSelectedRecipe(id: number) {
      return props.recipes.find((item) => item.id === id);
    }

    const locationRecipeId = Number(location.pathname.replace("/recipe/", ""));
    const recipe = getSelectedRecipe(locationRecipeId);
    if (recipe) {
      setRecipe(recipe);
      setDesiredServings(recipe.servings);
    }
  }, [location, props.recipes]);

  if (!recipe) return <div>Loading...</div>;

  const incrementServings = () => setDesiredServings(desiredServings + 1);
  const decrementServings = () => setDesiredServings(desiredServings - 1);

  const ingredients = (
    <div className={"content"}>
      <div style={{ marginBottom: "8px" }}>
        <span className="button is-small is-static" aria-readonly={true}>
          Servings: {desiredServings}
        </span>
        <button
          className="button is-small"
          onClick={decrementServings}
          disabled={desiredServings === 1}
        >
          -
        </button>
        <button className="button is-small" onClick={incrementServings}>
          +
        </button>
      </div>

      {recipe.ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          ingredient={ingredient}
          desiredQuantity={getDesiredQuantity(
            ingredient,
            recipe.servings,
            desiredServings
          )}
        />
      ))}
    </div>
  );

  const directions = (
    <div className={"content"}>
      <ol style={{ marginLeft: "16px" }}>
        {recipe.directions.map((direction) => (
          <Direction key={direction.text} direction={direction} />
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <section className={"hero is-info"}>
        <div className={"hero-body"}>
          <div className={"container"}>
            <h1 className="title">
              {recipe["name"]} {recipe["emoji"]}
            </h1>
            <h3 className="subtitle">
              Cooking Time: {recipe["cookingTime"]} - Difficulty:{" "}
              {recipe.difficulty}
            </h3>
            <h3 className="subtitle">
              Author: {recipe.author.fullName || 'Unknown'}
            </h3>
          </div>
        </div>
      </section>

      <section className={"section"}>
        <div className={"container"}>
          <div className={"columns"}>
            <div
              id={"ingredients-column"}
              className={"column is-one-quarter"}
              style={{ backgroundColor: "#fafafa" }}
            >
              <div key={recipe.name}>
                <h3 className="subtitle">Ingredients:</h3>
                {ingredients}
              </div>
            </div>
            <div id={"directions-column"} className={"column"}>
              <div key={recipe.name}>
                <h3 className={"subtitle"}>Directions:</h3>
                {directions}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// parses numbers, as well as fractions and fractions like '1 1/4'
function parseQuantity(quantity: string) {
  if (!isNaN(Number(quantity))) return quantity;

  if (quantity.indexOf(" ") !== -1) {
    const parts = quantity.split(" ");

    return parts.reduce(
      (accumulator, part) => Number(accumulator) + math.evaluate(part)
    );
  }

  return math.evaluate(quantity);
}

// figures out the desired quantity and formats it as a nice fraction if necessary.
function getDesiredQuantity(
  ingredient: IIngredient,
  defaultServings: number,
  desiredServings: number
): JSX.Element {
  const ratio = desiredServings / defaultServings;
  const desiredQuantity = parseQuantity(ingredient.quantity) * ratio;

  if (desiredQuantity === 0) return <></>;

  if (desiredQuantity === Math.round(desiredQuantity))
    return <>{desiredQuantity}</>;
  else {
    let fractional = desiredQuantity;
    let nonfractional = 0;
    while (fractional > 1) {
      nonfractional++;
      fractional -= 1;
    }

    const fraction = math.fraction(fractional) as Fraction;

    let result = (
      <>
        <sup>{fraction.n}</sup>/<sub>{fraction.d}</sub>
      </>
    );
    if (nonfractional !== 0)
      result = (
        <>
          {nonfractional} {result}
        </>
      );
    return result;
  }
}

interface IIngredientProps {
  ingredient: IIngredient;
  desiredQuantity: JSX.Element;
}

function Ingredient(props: IIngredientProps) {
  const ingredient = props.ingredient;
  const desiredQuantity = props.desiredQuantity;
  return (
    <div key={ingredient.name}>
      <label className="checkbox">
        <input type="checkbox" />
        <span style={{ paddingLeft: ".25em" }}>
          {desiredQuantity && desiredQuantity}
          &nbsp;{ingredient.unit && ingredient.unit}
          &nbsp;{ingredient.name}
        </span>
      </label>
    </div>
  );
}

interface IDirectionProps {
  direction: IDirection;
}

function Direction(props: IDirectionProps) {
  const direction = props.direction;

  let timeAmount = extractTiming(direction.text);
  const timer = timeAmount > 0 ? <Timer minutes={timeAmount} /> : null;

  return (
    <li key={direction.text}>
      {direction.text} {timer}
    </li>
  );
}

function extractTiming(text: string) {
  const words = text.split(" ");
  const timeIndex = words.findIndex(
    (word) => word.indexOf("minute") > -1 || word.indexOf("hour") > -1
  );
  let timeAmount = 0;
  if (timeIndex > -1) {
    timeAmount = parseInt(words[timeIndex - 1], 10);
    if (isNaN(timeAmount)) timeAmount = 0;

    let isHours = false;
    if (words[timeIndex].indexOf("hour") > -1) isHours = true;

    if (isHours) timeAmount *= 60;
  }

  return timeAmount;
}

export default Recipe;