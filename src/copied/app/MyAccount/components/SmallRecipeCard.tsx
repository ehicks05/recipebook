import React from "react";
import { Link } from "react-router-dom";
import { Card, T } from "core-components";
import { IRecipe } from "../../../../types/types";

interface ISmallRecipeCardProps {
  recipe: IRecipe;
}

function SmallRecipeCard({
  recipe: { id, emoji, name, author },
}: ISmallRecipeCardProps) {
  return (
    <div className="">
      <Link to={`/recipe/${id}`}>
        <Card className="lift">
          <div className="flex flex-col">
            <div className="flex gap-4">
              <figure className="h-16 w-16 pt-2 text-5xl">{emoji}</figure>
              <div className="w-full">
                <div>
                  <T className="font-semibold">{name}</T>
                </div>
                <T className="text-xs italic">{author.displayName}</T>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default SmallRecipeCard;
