import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CookingTime, Difficulty, T } from 'core-components';
import { IRecipe } from 'types/types';
import FavoriteButton from 'components/FavoriteButton';
import useUser from 'hooks/useUser';
import { emojiToImage } from '../constants';

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty },
}: IRecipeCardProps) {
  const { user } = useUser();

  return (
    <Card className="hover:shadow-lg transform transition-all">
      <div className="flex gap-4 h-48">
        <Link to={`/recipe/${id}`} className="h-56 w-full -m-4 mr-0 relative">
          <img
            className="h-56 w-full object-cover rounded-l"
            src={emojiToImage[emoji]}
            alt="recipe"
          />
          {user && (
            <FavoriteButton className="absolute top-2 left-2" recipeId={id} />
          )}
        </Link>
        {/* title row */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-start gap-2">
            <Link to={`/recipe/${id}`} className="w-full">
              <span className="text-lg sm:text-xl line-clamp-3 font-semibold text-amber-700 dark:text-amber-400">
                {name}
              </span>
            </Link>
          </div>
          <T className="line-clamp-3 text-sm">{description}</T>
          <div className="flex-grow" />
          <footer className="flex gap-4">
            <CookingTime cookingTime={cookingTime} />
            <Difficulty difficulty={difficulty} />
          </footer>
        </div>
      </div>
    </Card>
  );
}

export default RecipeCard;
