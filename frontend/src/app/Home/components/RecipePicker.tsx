import React, { useState } from 'react';
import { Button, Loading, T } from 'core-components';
import { useFetchRecipes } from 'hooks/recipes';
import { IRecipe } from '../../../types/types';
import RecipeCardOld from './RecipeCardOld';
import RecipeCard from './RecipeCard';
import RecipeCardLandscape from './RecipeCardLandscape';

const Toggle = ({
  id,
  disabled,
  checked,
  onChange,
  label,
}: {
  id: string;
  disabled?: boolean;
  checked: boolean;
  onChange: () => void;
  label: string;
}) => {
  return (
    <label
      htmlFor={id}
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        id={id}
        disabled={disabled}
        type="checkbox"
        className="accent-amber-400"
        checked={checked}
        onChange={() => onChange()}
      />
      <span
        className={`ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${
          disabled ? 'text-gray-500 dark:text-gray-600' : ''
        }`}
      >
        {label}
      </span>
    </label>
  );
};

interface IProps {
  recipes: IRecipe[];
}

function RecipePicker({ recipes }: IProps) {
  const [filterInput, setFilterInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newCard, setNewCard] = useState(false);
  const [layout, setLayout] = useState('portrait');

  const filteredRecipes = recipes.filter(recipe => {
    const recipeIngredients = recipe.ingredients
      .map(x => x.name.toLowerCase())
      .join();
    return ingredients.every(recipeFilter =>
      recipeIngredients.includes(recipeFilter)
    );
  });

  const handleAddFilter = () => {
    if (!ingredients.includes(filterInput)) {
      setIngredients([...ingredients, filterInput.toLowerCase()]);
      setFilterInput('');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <input
          className="px-2 py-1.5 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200"
          value={filterInput}
          onChange={e => setFilterInput(e.target.value.toLowerCase())}
          onKeyPress={e => e.key === 'Enter' && handleAddFilter()}
          placeholder="Search by Ingredient"
        />
        {ingredients.length > 0 && (
          <Button className="ml-2" onClick={() => setIngredients([])}>
            Clear
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        {ingredients.map(ingredient => (
          <Button
            key={ingredient}
            className="text-xs"
            onClick={() =>
              setIngredients(ingredients.filter(i => i !== ingredient))
            }
          >
            {ingredient}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-4 my-4 bg-slate-200 dark:bg-slate-800 rounded">
        <T className="">Experiments:</T>
        <Toggle
          id="newCard"
          checked={newCard}
          onChange={() => setNewCard(!newCard)}
          label="New Card UI"
        />
        <Toggle
          id="layoutMode"
          disabled={!newCard}
          checked={layout === 'landscape'}
          onChange={() =>
            setLayout(layout === 'landscape' ? 'portrait' : 'landscape')
          }
          label="Landscape Layout"
        />
      </div>
      {!newCard && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map(recipe => (
            <RecipeCardOld key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && <T>No results...</T>}
        </div>
      )}
      {newCard && layout === 'landscape' && (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map(recipe => (
            <RecipeCardLandscape key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && <T>No results...</T>}
        </div>
      )}
      {newCard && layout === 'portrait' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && <T>No results...</T>}
        </div>
      )}
    </div>
  );
}

const RecipePickerWrapper = () => {
  const { isLoading, error, data: recipes } = useFetchRecipes();

  if (isLoading) return <Loading />;
  if (error || !recipes)
    return <div>{error?.message || 'Something went wrong'}</div>;

  return <RecipePicker recipes={recipes} />;
};

export default RecipePickerWrapper;
