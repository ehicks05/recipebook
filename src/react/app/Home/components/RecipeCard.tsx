import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FcClock, IoIosFitness } from 'react-icons/all';
import { IRecipe } from '../../../types/types';
import FavoriteButton from '../../../components/FavoriteButton';
import { UserContext } from '../../../UserContext';

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({ recipe }: IRecipeCardProps) {
  const { user, favoriteIds, fetchFavoriteIds } = useContext(UserContext);

  return (
    <div className="column is-half-tablet is-one-third-desktop">
      <Link to={`/recipe/${recipe.id}`}>
        <div className="card grow">
          <div
            className="card-content is-flex is-flex-direction-column"
            style={{ height: '14em' }}
          >
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64" style={{ fontSize: '3em' }}>
                  {recipe.emoji}
                </figure>
              </div>
              <div className="media-content">
                <div className="title is-6">{recipe.name}</div>
                <div className="subtitle is-7 is-italic">
                  {recipe.author.displayName}
                </div>
              </div>
              <div className="media-right" onClick={e => e.preventDefault()}>
                {user && (
                  <FavoriteButton
                    recipeId={recipe.id}
                    favoriteIds={favoriteIds}
                    fetchFavorites={fetchFavoriteIds}
                  />
                )}
              </div>
            </div>

            <div className="content" style={{ overflowY: 'auto' }}>
              <div>{_.truncate(recipe.description, { length: 128 })}</div>
            </div>
          </div>

          <footer className="card-footer">
            <CardFooterItem
              title="Time"
              icon={<FcClock size="2em" />}
              value={recipe.cookingTime}
            />
            <CardFooterItem
              title="Difficulty"
              icon={<IoIosFitness size="2em" />}
              value={recipe.difficulty}
            />
          </footer>
        </div>
      </Link>
    </div>
  );
}

interface ICardFooterItemProps {
  title: string;
  icon: JSX.Element;
  value: string | number;
}

function CardFooterItem({ title, icon, value }: ICardFooterItemProps) {
  return (
    <div className="card-footer-item" title={title}>
      <nav className="level">
        <div className="level-item">
          <span className="icon">{icon}</span>
        </div>
        <div className="level-item">
          <span className="mx-1 has-text-weight-bold">{value}</span>
        </div>
      </nav>
    </div>
  );
}

export default RecipeCard;
