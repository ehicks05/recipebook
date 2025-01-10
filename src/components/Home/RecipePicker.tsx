'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, MyInput, T } from 'components/core';
import React, { useState } from 'react';
import { api } from 'trpc/react';
import type { Recipe } from 'trpc/types';
import RecipeCard from './RecipeCard';

function RecipePicker({ initialRecipes }: { initialRecipes: Recipe[] }) {
	const [parent] = useAutoAnimate();
	const [termInput, setTermInput] = useState('');
	const [terms, setTerms] = useState<string[]>([]);

	const handleAddTerm = () => {
		if (!terms.includes(termInput)) {
			setTerms([...terms, termInput.toLowerCase()]);
			setTermInput('');
		}
	};

	const { data: searchResultRecipes } = api.example.findRecipes.useQuery(
		{ terms },
		{ enabled: terms.length !== 0 },
	);

	const recipes = searchResultRecipes || initialRecipes;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<MyInput
					className="bg-neutral-100 px-2 py-1.5 dark:bg-neutral-800 dark:text-neutral-200"
					value={termInput}
					onChange={(e) => setTermInput(e.target.value.toLowerCase())}
					onKeyUp={(e) => e.key === 'Enter' && handleAddTerm()}
					placeholder="Search"
				/>
				{terms.length > 0 && (
					<Button className="ml-2" onClick={() => setTerms([])}>
						Clear
					</Button>
				)}
			</div>
			<div
				className={`${terms.length === 0 ? 'hidden' : 'flex'} gap-2`}
				ref={parent}
			>
				{terms.map((term) => (
					<Button
						key={term}
						className="text-sm"
						onClick={() => setTerms(terms.filter((i) => i !== term))}
					>
						{term}
					</Button>
				))}
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{recipes?.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
				{recipes?.length === 0 && <T>No results...</T>}
			</div>
		</div>
	);
}

export default RecipePicker;
