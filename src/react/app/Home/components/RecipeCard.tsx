import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FcClock, IoIosFitness } from 'react-icons/all';
import { IRecipe } from '../../../types/types';
import FavoriteButton from '../../../components/FavoriteButton';
import { UserContext } from '../../../UserContext';
import Card from '../../../components/Card';

interface ICardFooterItemProps {
  title: string;
  icon: JSX.Element;
  value: string | number;
}

function CardFooterItem({ title, icon, value }: ICardFooterItemProps) {
  return (
    <div
      className="flex gap-2 justify-center items-center w-full"
      title={title}
    >
      <div>{icon}</div>
      <div className="font-semibold dark:text-gray-200">{value}</div>
    </div>
  );
}

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty },
}: IRecipeCardProps) {
  const { user, favoriteIds, fetchFavoriteIds } = useContext(UserContext);

  return (
    <div className="">
      <Link to={`/recipe/${id}`}>
        <Card className="lift">
          <div className="flex flex-col gap-4 h-56">
            <div className="flex gap-2">
              <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
              <div className="w-full">
                <div className="font-semibold dark:text-gray-200">{name}</div>
                <div className="text-xs italic dark:text-gray-200">
                  {author.displayName}
                </div>
              </div>
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

            <div className="dark:text-gray-200">
              <div>{_.truncate(description, { length: 128 })}</div>
            </div>
          </div>

          <footer className="flex pt-4 border-t border-opacity-25">
            <CardFooterItem
              title="Time"
              icon={<FcClock size="2em" />}
              value={cookingTime}
            />
            <CardFooterItem
              title="Difficulty"
              icon={<IoIosFitness size="2em" color="lightgray" />}
              value={difficulty}
            />
          </footer>
        </Card>
      </Link>
    </div>
  );
}

export default RecipeCard;
