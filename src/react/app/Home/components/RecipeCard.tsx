import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FcClock, IoIosFitness } from 'react-icons/all';
import { IRecipe } from '../../../types/types';
import FavoriteButton from '../../../components/FavoriteButton';
import { UserContext } from '../../../UserContext';

interface ICardFooterItemProps {
  title: string;
  icon: JSX.Element;
  value: string | number;
}

function CardFooterItem({ title, icon, value }: ICardFooterItemProps) {
  return (
    <div className="flex gap-2 p-2 justify-center items-center w-full" title={title}>
      <div>{icon}</div>
      <div className="mx-1 font-semibold">{value}</div>
    </div>
  );
}

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: {
    id, emoji, name, author, description, cookingTime, difficulty,
  },
}: IRecipeCardProps) {
  const { user, favoriteIds, fetchFavoriteIds } = useContext(UserContext);

  return (
    <div className="">
      <Link to={`/recipe/${id}`}>
        <div className="card lift">
          <div className="flex flex-col h-56 p-4">
            <div className="flex gap-4">
              <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
              <div className="w-full">
                <div className="font-semibold text-gray-200">{name}</div>
                <div className="text-xs italic">{author.displayName}</div>
              </div>
              <div onClick={e => e.preventDefault()}>
                {user && (
                  <FavoriteButton
                    recipeId={id}
                    favoriteIds={favoriteIds}
                    fetchFavorites={fetchFavoriteIds}
                  />
                )}
              </div>
            </div>

            <div className="pt-4" style={{ overflowY: 'auto' }}>
              <div>{_.truncate(description, { length: 128 })}</div>
            </div>
          </div>

          <footer className="flex border-t border-opacity-25">
            <CardFooterItem
              title="Time"
              icon={<FcClock size="2em" />}
              value={cookingTime}
            />
            <CardFooterItem
              title="Difficulty"
              icon={<IoIosFitness size="2em" />}
              value={difficulty}
            />
          </footer>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
