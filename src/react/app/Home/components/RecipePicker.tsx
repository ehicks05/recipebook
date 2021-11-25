import React, { useState } from 'react';
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
    return ingredients.every(recipeFilter => recipeIngredients.includes(recipeFilter));
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
          className="px-2 py-1 bg-gray-800"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value.toLowerCase())}
          onKeyPress={(e) => e.key === 'Enter' && handleAddFilter()}
          placeholder="Search by Ingredient"
        />
        {ingredients.length > 0 && (
        <button
          type="button"
          className="ml-2 bg-gray-800 border px-2 py-1 border-gray-600"
          onClick={() => setIngredients([])}
        >
          Clear
        </button>
        )}
      </div>
      <div className="flex gap-2">
        {ingredients.map(ingredient => (
          <button
            key={ingredient}
            type="button"
            className="flex gap-1 px-2 py-0.5 rounded text-white bg-blue-600 text-sm"
            onClick={() => setIngredients(ingredients.filter(i => i !== ingredient))}
          >
            {ingredient}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipePicker;
