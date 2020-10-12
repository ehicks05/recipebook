import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "../../../types/types";

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({ recipe }: IRecipeCardProps) {
  return (
    <div className="column is-half-tablet is-one-third-desktop">
      <Link to={"/recipe/" + recipe.id}>
        <div className="card grow" style={{ height: "100%" }}>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64" style={{ fontSize: "3em" }}>
                  {recipe.emoji}
                </figure>
              </div>
              <div className="media-content">
                <div className="title is-4">{recipe.name}</div>
                <div className="subtitle is-6">{recipe.author.username}</div>
              </div>
            </div>

            <div className="content">
              <div>Description: {recipe.description}</div>
              <div>Time: {recipe.cookingTime}</div>
              <div>Difficulty: {recipe.difficulty}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
