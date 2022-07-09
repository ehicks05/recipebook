import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CookingTime, Difficulty, T } from 'core-components';
import { IRecipe } from 'types/types';
import FavoriteButton from 'components/FavoriteButton';
import useUser from 'hooks/useUser';

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty },
}: IRecipeCardProps) {
  const { user } = useUser();

  return (
    <Card className="hover:shadow-lg transform transition-all">
      <div className="flex flex-col gap-4 h-56">
        {/* title row */}
        <div className="flex items-start gap-2">
          <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
          <div className="w-full">
            <Link to={`/recipe/${id}`}>
              <div className="font-semibold dark:text-neutral-200">{name}</div>
              <div className="text-xs italic dark:text-neutral-200">
                {author.displayName}
              </div>
            </Link>
          </div>
          {user && <FavoriteButton recipeId={id} />}
        </div>
        <T className="line-clamp-5">{description}</T>
      </div>

      <footer className="flex gap-4 pt-4">
        <CookingTime cookingTime={cookingTime} />
        <Difficulty difficulty={difficulty} />
      </footer>
    </Card>
  );
}

export default RecipeCard;
