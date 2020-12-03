import React from "react";
import { IRecipe } from "../../../types/types";
import { Link } from "react-router-dom";

interface ISmallRecipeCardProps {
  recipe: IRecipe;
}

function SmallRecipeCard({ recipe }: ISmallRecipeCardProps) {
  return (
    <div className="column is-full-tablet">
      <Link to={"/recipe/" + recipe.id}>
        <div className="card grow">
          <div
            className="card-content is-flex is-flex-direction-column"
            style={{ height: "8em" }}
          >
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64" style={{ fontSize: "3em" }}>
                  {recipe.emoji}
                </figure>
              </div>
              <div className="media-content">
                <div className="title is-5">{recipe.name}</div>
                <div className="subtitle is-6 is-italic">
                  {recipe.author.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SmallRecipeCard;
