import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiDownload, BiEdit } from 'react-icons/all';
import Hero from '../../components/Hero';
import { IRecipe } from '../../types/types';
import Directions from './Components/Directions';
import Ingredients from './Components/Ingredients';
import { UserContext } from '../../UserContext';
import { stripRecipe, updateClipboard } from './utils';

interface IProps {
  recipe: IRecipe;
}

function Recipe({ recipe }: IProps) {
  const { user } = useContext(UserContext);
  const [scaledServings, setScaledServings] = useState(recipe.servings);

  return (
    <>
      <Hero title={`${recipe.name} ${recipe.emoji}`}>
        <div className="font-semibold text-sm">{recipe.author.displayName}</div>
      </Hero>
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-6">
            <div className="order-1">
              <h3 className="text-lg font-semibold">Details</h3>
              <div>
                <b>Time:</b> {recipe.cookingTime}
              </div>
              <div>
                <b>Description:</b> {recipe.description}
              </div>
            </div>
            <div className="order-2 md:order-3">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <Ingredients
                ingredients={recipe.ingredients}
                defaultServings={recipe.servings}
                scaledServings={scaledServings}
                setScaledServings={setScaledServings}
              />
            </div>
            <div className="sm:col-span-2 order-3 md:order-2">
              <h3 className="text-lg font-semibold">Directions</h3>
              <Directions directions={recipe.directions} />
            </div>
          </div>
          <div className="flex gap-2 p-4">
            {user?.id === recipe.author.id && (
              <Link to={`/edit-recipe/${recipe.id}`} title="Edit Recipe">
                <BiEdit className="text-2xl" />
              </Link>
            )}
            <BiDownload
              title="Copy to Clipboard"
              className="text-2xl cursor-pointer"
              onClick={() =>
                updateClipboard(JSON.stringify(stripRecipe(recipe), null, 2))
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Recipe;
