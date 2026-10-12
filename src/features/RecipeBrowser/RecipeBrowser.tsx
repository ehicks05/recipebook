import { useAutoAnimate } from '@formkit/auto-animate/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/components/core';
import { Button } from '@/components/ui/button';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
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

	const handleClear = () => setTerms([]);

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
				<InputGroup>
					<InputGroupInput
						value={termInput}
						onChange={(e) => setTermInput(e.target.value.toLowerCase())}
						onKeyUp={(e) => e.key === 'Enter' && handleAddTerm()}
						placeholder="Search"
					/>
					{terms.length > 0 && (
						<InputGroupAddon align="inline-end">
							<InputGroupButton variant="secondary" onClick={handleClear}>
								Clear
							</InputGroupButton>
						</InputGroupAddon>
					)}
				</InputGroup>

				{terms.length !== 0 && (
					<div className={`flex gap-2`} ref={parent}>
						{terms.map((term) => (
							<Button
								key={term}
								variant="outline"
								onClick={() => setTerms(terms.filter((i) => i !== term))}
							>
								{term} <X />
							</Button>
						))}
					</div>
				)}

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
