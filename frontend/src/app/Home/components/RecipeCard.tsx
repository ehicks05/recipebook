import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineClock } from 'react-icons/hi';
import { clamp, range } from 'lodash';
import { Card, T } from 'core-components';
import { IRecipe } from '../../../types/types';
import FavoriteButton from '../../../components/FavoriteButton';
import { UserContext } from '../../../UserContext';

const DIFFICULTIES: Record<number, { label: string; color: string }> = {
  1: { label: 'Easy', color: 'bg-green-500' },
  2: { label: 'Medium', color: 'bg-yellow-500' },
  3: { label: 'Hard', color: 'bg-red-500' },
};

const DifficultyIcon = ({ difficulty }: { difficulty: number }) => {
  return (
    <div className="flex flex-col-reverse gap-0.5">
      {range(1, 4).map(i => (
        <div
          className={`w-2 h-2 rounded-full ${
            difficulty >= i
              ? DIFFICULTIES[i]?.color
              : 'bg-neutral-300 dark:bg-neutral-500'
          }`}
        />
      ))}
    </div>
  );
};

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty },
}: IRecipeCardProps) {
  const { user, favoriteIds, fetchFavoriteIds } = useContext(UserContext);

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
          <div className="flex gap-2 justify-center items-center w-full py-2 rounded bg-neutral-100 dark:bg-neutral-700">
            <div>
              <HiOutlineClock size="2em" className="dark:text-neutral-200" />
            </div>
            <div className="font-semibold dark:text-neutral-200">
              {cookingTime}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center w-full rounded bg-neutral-100 dark:bg-neutral-700">
            <div>
              <DifficultyIcon difficulty={difficulty} />
            </div>
            <div className="font-semibold dark:text-neutral-200">
              {DIFFICULTIES[clamp(difficulty, 1, 3)]?.label ||
                'Fix this recipe'}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center w-full rounded bg-neutral-100 dark:bg-neutral-700">
            {user && (
              <div onClick={e => e.preventDefault()}>
                <FavoriteButton
                  recipeId={id}
                  favoriteIds={favoriteIds}
                  fetchFavorites={fetchFavoriteIds}
                />
              </div>
            )}
          </div>
        </footer>
      </Card>
    </Link>
  );
}

export default RecipeCard;
