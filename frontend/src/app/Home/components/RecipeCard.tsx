import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CookingTime, Difficulty, T } from 'core-components';
import { IRecipe } from 'types/types';
import FavoriteButton from 'components/FavoriteButton';
import useUser from 'hooks/useUser';
import RecipeStat from 'core-components/RecipeStat';

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty },
}: IRecipeCardProps) {
  const { user } = useUser();

  return (
    <Link to={`/recipe/${id}`}>
      <Card className="hover:shadow-lg transform transition-all">
        <div className="flex flex-col gap-4 h-56">
          <div className="flex gap-2">
            <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
            <div className="w-full">
              <div className="font-semibold dark:text-neutral-200">{name}</div>
              <div className="text-xs italic dark:text-neutral-200">
                {author.displayName}
              </div>
            </div>
          </div>

          <T className="line-clamp-5">{description}</T>
        </div>

        <footer className="flex gap-4 pt-4">
          <CookingTime cookingTime={cookingTime} />
          <Difficulty difficulty={difficulty} />
          {user && (
            <RecipeStat>
              <div onClick={e => e.preventDefault()}>
                <FavoriteButton recipeId={id} />
              </div>
            </RecipeStat>
          )}
        </footer>
      </Card>
    </Link>
  );
}

export default RecipeCard;
