import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/Hero';
import { IRecipe } from '../../types/types';
import Directions from './Components/Directions';
import Ingredients from './Components/Ingredients';

interface IProps {
  recipes: IRecipe[];
}

function Recipe({ recipes }: IProps) {
  const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
  const [desiredServings, setDesiredServings] = useState(0);

  const location = useLocation();

  useEffect(() => {
    function getSelectedRecipe(id: number) {
      return recipes.find(item => item.id === id);
    }

    const locationRecipeId = Number(location.pathname.replace('/recipe/', ''));
    const recipe = getSelectedRecipe(locationRecipeId);

    if (recipe) {
      setRecipe(recipe);
      setDesiredServings(recipe.servings);
    }
  }, [location, recipes]);

  if (!recipe) return <Hero title="Loading..." />;

  const title = `${recipe.name} ${recipe.emoji}`;

  return (
    <>
      <Hero title={title}>
        <div className="subtitle is-6">
          by <b>{recipe.author.displayName}</b>
        </div>
      </Hero>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div id="details-column" className="column is-one-quarter">
              <div key={recipe.name}>
                <h3 className="subtitle has-text-weight-bold">Details</h3>
                <div className="">
                  <b>Time:</b> {recipe.cookingTime}
                </div>
                <br />
                <div className="">
                  <b>Description</b>: {recipe.description}
                </div>
              </div>
            </div>
            <div id="ingredients-column" className="column is-one-quarter">
              <div key={recipe.name}>
                <h3 className="subtitle has-text-weight-bold">Ingredients</h3>
                <Ingredients
                  ingredients={recipe.ingredients}
                  defaultServings={recipe.servings}
                  desiredServings={desiredServings}
                  incrementServings={() => setDesiredServings(desiredServings + 1)}
                  decrementServings={() => setDesiredServings(desiredServings - 1)}
                />
              </div>
            </div>
            <div id="directions-column" className="column">
              <div key={recipe.name} style={{ maxWidth: '40em' }}>
                <h3 className="subtitle has-text-weight-bold">Directions</h3>
                <Directions directions={recipe.directions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Recipe;
