import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "../../../types/types";

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({ recipe }: IRecipeCardProps) {
  return (
    <div className="column" style={{ minWidth: "24em", maxWidth: "32em" }}>
      <Link to={"/recipe/" + recipe.id}>
        <div className="card grow">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64" style={{ fontSize: "3em" }}>
                  {recipe.emoji}
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{recipe.name}</p>
                <p className="subtitle is-6">{recipe.author.username}</p>
              </div>
            </div>

            <div className="content">
              {recipe.description}
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
