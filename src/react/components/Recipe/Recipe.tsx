import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IRecipe } from '../types';
import { Direction, Ingredient } from './Components';

interface IProps {
  recipes: IRecipe[];
}

function Recipe(props: IProps) {
  const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);
  const [desiredServings, setDesiredServings] = useState(0);

  let location = useLocation();

  useEffect(() => {
    function getSelectedRecipe(id: number) {
      return props.recipes.find((item) => item.id === id);
    }

    const locationRecipeId = Number(location.pathname.replace('/recipe/', ''));
    const recipe = getSelectedRecipe(locationRecipeId);

    if (recipe) {
      setRecipe(recipe);
      setDesiredServings(recipe.servings);
    }
  }, [location, props.recipes]);

  if (!recipe) return <div>Loading...</div>;

  const incrementServings = () => setDesiredServings(desiredServings + 1);
  const decrementServings = () => setDesiredServings(desiredServings - 1);

  const ingredients = (
    <div className={'content'}>
      <div style={{ marginBottom: '8px' }}>
        <span className="button is-small is-static" aria-readonly={true}>
          Servings: {desiredServings}
        </span>
        <button
          className="button is-small"
          onClick={decrementServings}
          disabled={desiredServings === 1}
        >
          -
        </button>
        <button className="button is-small" onClick={incrementServings}>
          +
        </button>
      </div>

      {recipe.ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          ingredient={ingredient}
          recipeServings={recipe.servings}
          desiredServings={desiredServings}
        />
      ))}
    </div>
  );

  const directions = (
    <div className={'content'}>
      <ol style={{ marginLeft: '16px' }}>
        {recipe.directions.map((direction) => (
          <Direction key={direction.text} direction={direction} />
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <section className={'hero is-info'}>
        <div className={'hero-body'}>
          <div className={'container'}>
            <h1 className="title">
              {recipe['name']} {recipe['emoji']}
            </h1>
            <h3 className="subtitle">
              Cooking Time: {recipe['cookingTime']} - Difficulty:{' '}
              {recipe.difficulty}
            </h3>
          </div>
        </div>
      </section>

      <section className={'section'}>
        <div className={'container'}>
          <div className={'columns'}>
            <div
              id={'ingredients-column'}
              className={'column is-one-quarter'}
              style={{ backgroundColor: '#fafafa' }}
            >
              <div key={recipe.name}>
                <h3 className="subtitle">Ingredients:</h3>
                {ingredients}
              </div>
            </div>
            <div id={'directions-column'} className={'column'}>
              <div key={recipe.name}>
                <h3 className={'subtitle'}>Directions:</h3>
                {directions}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Recipe;
