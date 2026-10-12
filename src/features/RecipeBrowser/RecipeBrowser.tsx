import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { Button, Container, MyInput } from '@/components/core';
import type { Recipe } from '@/functions/recipes';
import { RecipeCard } from './RecipeCard';

export function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
	const [parent] = useAutoAnimate();
	const [termInput, setTermInput] = useState('');
	const [terms, setTerms] = useState<string[]>([]);

	const handleAddTerm = () => {
		if (!terms.includes(termInput)) {
			setTerms([...terms, termInput.toLowerCase()]);
			setTermInput('');
		}
	};

	const isMatch = (recipe: Recipe, term: string) =>
		recipe.ingredients
			.map((ingredient) => ingredient.name.toLowerCase())
			.includes(term) ||
		recipe.author.name?.toLowerCase().includes(term) ||
		recipe.name.toLowerCase().includes(term) ||
		recipe.description.toLowerCase().includes(term);

	const filteredRecipes =
		terms.length === 0
			? recipes
			: recipes.filter((recipe) => terms.every((term) => isMatch(recipe, term)));

	return (
		<Container>
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

				<div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
					{filteredRecipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
					{filteredRecipes?.length === 0 && <span>No results...</span>}
				</div>
			</div>
		</Container>
	);
}
