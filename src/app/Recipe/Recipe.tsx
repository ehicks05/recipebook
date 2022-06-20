import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiDownload, BiEdit } from 'react-icons/bi';
import Hero from '../../components/Hero';
import { IRecipe } from '../../types/types';
import Directions from './Components/Directions';
import Ingredients from './Components/Ingredients';
import { UserContext } from '../../UserContext';
import { stripRecipe, updateClipboard } from './utils';
import Container from '../../components/Container';
import T from '../../components/T';
import Button from '../../components/Button';

interface IProps {
  recipe: IRecipe;
}

function Recipe({ recipe }: IProps) {
  const { user } = useContext(UserContext);
  const [scaledServings, setScaledServings] = useState(recipe.servings);

  return (
    <>
      <Hero title={`${recipe.name} ${recipe.emoji}`}>
        <T className="font-semibold text-sm">{recipe.author.displayName}</T>
      </Hero>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-6">
          <div className="order-1">
            <T className="text-lg font-semibold">Details</T>
            <div>
              <T className="font-semibold">Time:</T> <T>{recipe.cookingTime}</T>
            </div>
            <div>
              <T className="font-semibold">Description:</T>{' '}
              <T>{recipe.description}</T>
            </div>
          </div>
          <div className="order-2 md:order-3">
            <T className="text-lg font-semibold">Ingredients</T>
            <Ingredients
              ingredients={recipe.ingredients}
              defaultServings={recipe.servings}
              scaledServings={scaledServings}
              setScaledServings={setScaledServings}
            />
          </div>
          <div className="sm:col-span-2 order-3 md:order-2">
            <T className="text-lg font-semibold">Directions</T>
            <Directions directions={recipe.directions} />
          </div>
        </div>
        <div className="flex gap-2 p-4">
          {user?.id === recipe.author.id && (
            <Link to={`/edit-recipe/${recipe.id}`} title="Edit Recipe">
              <Button>
                <BiEdit className="text-2xl" />
              </Button>
            </Link>
          )}
          <Button
            onClick={() =>
              updateClipboard(JSON.stringify(stripRecipe(recipe), null, 2))
            }
          >
            <BiDownload
              title="Copy to Clipboard"
              className="text-2xl cursor-pointer"
            />
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Recipe;
