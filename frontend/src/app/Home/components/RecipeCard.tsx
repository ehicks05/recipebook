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
      <div className="flex flex-col gap-4 h-80">
        <div className="h-48 -m-4 mb-0">
          <Link to={`/recipe/${id}`}>
            <img
              className="h-48 w-full object-cover rounded-t"
              src={emojiToImage[emoji]}
              alt="recipe"
            />
          </Link>
        </div>
        {/* title row */}
        <div className="flex items-start gap-2">
          <div className="w-full">
            <Link to={`/recipe/${id}`}>
              <div className="text-xl font-semibold text-amber-700 dark:text-amber-400">
                {name}
              </div>
              {/* <div className="text-xs italic dark:text-neutral-200">
                {author.displayName}
              </div> */}
            </Link>
          </div>
          {user && <FavoriteButton className="absolute top-2 right-2" recipeId={id} />}
        </div>
        <T className="line-clamp-2 text-sm">{description}</T>
      </div>

      <footer className="flex gap-4 pt-4">
        <CookingTime cookingTime={cookingTime} />
        <Difficulty difficulty={difficulty} />
      </footer>
    </Card>
  );
}

export default RecipeCard;
