'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, MyInput, T } from 'components/core';
import React, { useState } from 'react';
import type { CompleteRecipe as _CompleteRecipe } from 'server/api/routers/example';
import RecipeCard from './RecipeCard';

type CompleteRecipe = _CompleteRecipe & { isUserFavorite: boolean };

const applyIngredientFilter = (recipes: CompleteRecipe[], ingredients: string[]) => {
	return recipes.filter((recipe) => {
		const recipeIngredients = recipe.ingredients
			.map((x) => x.name.toLowerCase())
			.join();
		return ingredients.every((recipeFilter) =>
			recipeIngredients.includes(recipeFilter),
		);
	});
};

const applySearch = (recipes: CompleteRecipe[], search: string) => {
	return recipes.filter((recipe) => {

		const corpus = [recipe.name,
		recipe.description,
		recipe.author.displayName,
		...recipe.ingredients.map(i => i.name),
		...recipe.directions.map(d => d.text),
		].map(o => o?.toLocaleLowerCase());

		return corpus.some(o => o?.includes(search))
	});
};

interface Props {
	recipes: CompleteRecipe[];
	recipeOfTheDayId: string;
}

function RecipePicker({ recipes, recipeOfTheDayId }: Props) {
	const [parent] = useAutoAnimate();
	const [searchInput, setSearchInput] = useState('');
	const [ingredientInput, setIngredientInput] = useState('');
	const [ingredients, setIngredients] = useState<string[]>([]);

	const filteredRecipes = applyIngredientFilter(
		applySearch(recipes, searchInput),
		ingredients,
	);

	const handleAddFilter = () => {
		if (!ingredients.includes(ingredientInput)) {
			setIngredients([...ingredients, ingredientInput.toLowerCase()]);
			setIngredientInput('');
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<MyInput
					className="bg-neutral-100 px-2 py-1.5 dark:bg-neutral-800 dark:text-neutral-200"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
					placeholder="Search"
				/>
				<MyInput
					className="bg-neutral-100 px-2 py-1.5 dark:bg-neutral-800 dark:text-neutral-200"
					value={ingredientInput}
					onChange={(e) => setIngredientInput(e.target.value.toLowerCase())}
					onKeyUp={(e) => e.key === 'Enter' && handleAddFilter()}
					placeholder="Search by Ingredient"
				/>
				{ingredients.length > 0 && (
					<Button className="ml-2" onClick={() => setIngredients([])}>
						Clear
					</Button>
				)}
			</div>
			<div
				className={`${ingredients.length === 0 ? 'hidden' : 'flex'} gap-2`}
				ref={parent}
			>
				{ingredients.map((ingredient) => (
					<Button
						key={ingredient}
						className="text-xs"
						onClick={() =>
							setIngredients(ingredients.filter((i) => i !== ingredient))
						}
					>
						{ingredient}
					</Button>
				))}
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredRecipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} isRecipeOfTheDay={recipe.id === recipeOfTheDayId} />
				))}
				{filteredRecipes.length === 0 && <T>No results...</T>}
			</div>
		</div>
	);
}

export default RecipePicker;
