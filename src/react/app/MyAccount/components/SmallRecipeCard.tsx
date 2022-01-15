import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import T from '../../../components/T';
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
        <Card className="lift">
          <div className="flex flex-col">
            <div className="flex gap-4">
              <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
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
