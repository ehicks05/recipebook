import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiDownload, BiEdit } from 'react-icons/all';
import Hero from '../../components/Hero';
import { IRecipe } from '../../types/types';
import Directions from './Components/Directions';
import Ingredients from './Components/Ingredients';
import { UserContext } from '../../UserContext';
import { stripRecipe, updateClipboard } from './utils';

interface IProps {
  recipes: IRecipe[];
}

function Recipe({ recipes }: IProps) {
  const { user } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(item => item?.id === Number(id));
  const [scaledServings, setScaledServings] = useState(recipe?.servings || 0);

  if (!recipe) return <Hero title="Loading..." />;

  return (
    <>
      <Hero title={`${recipe.name} ${recipe.emoji}`}>
        <div className="font-semibold text-sm">{recipe.author.displayName}</div>
      </Hero>
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <h3 className="subtitle font-semibold">Details</h3>
              <div>
                <b>Time:</b> {recipe.cookingTime}
              </div>
              <div>
                <b>Description:</b> {recipe.description}
              </div>
            </div>
            <div className="order-2 md:order-3 md:max-w-sm">
              <h3 className="subtitle font-semibold">Ingredients</h3>
              <Ingredients
                ingredients={recipe.ingredients}
                defaultServings={recipe.servings}
                scaledServings={scaledServings}
                setScaledServings={setScaledServings}
              />
            </div>
            <div className="order-3 md:order-2 max-w-5xl md:max-w-full">
              <h3 className="subtitle font-semibold">Directions</h3>
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
