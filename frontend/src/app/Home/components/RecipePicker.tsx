import T from 'components/T';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import { IRecipe } from '../../../types/types';
import RecipeCard from './RecipeCard';

interface IProps {
  recipes: IRecipe[];
}

function RecipePicker({ recipes }: IProps) {
  const [filterInput, setFilterInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

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
      <div className="flex gap-1">
        <input
          className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200"
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {filteredRecipes.length === 0 && <T>No results...</T>}
      </div>
    </div>
  );
}

export default RecipePicker;
