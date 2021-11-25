import React from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../../../types/types';

interface ISmallRecipeCardProps {
  recipe: IRecipe;
}

function SmallRecipeCard({
  recipe: { id, emoji, name, author },
}: ISmallRecipeCardProps) {
  return (
    <div className="">
      <Link to={`/recipe/${id}`}>
        <div className="card lift">
          <div className="flex flex-col p-4">
            <div className="flex gap-4">
              <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
              <div className="w-full">
                <div className="font-semibold text-gray-200">{name}</div>
                <div className="text-xs italic">{author.displayName}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SmallRecipeCard;
