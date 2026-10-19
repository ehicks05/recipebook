import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import type { Ingredient } from '@/functions/recipes.functions';
import { IngredientLine } from './Ingredient';

interface Props {
	ingredients: Ingredient[];
	defaultServings: number;
}

export function Ingredients({ ingredients, defaultServings }: Props) {
	const [scaledServings, setScaledServings] = useState(defaultServings);

	const handleDecrease = () => setScaledServings(scaledServings - 1);
	const handleIncrease = () => setScaledServings(scaledServings + 1);
	const handleDefault = () => setScaledServings(defaultServings);
	const isDefault = scaledServings === defaultServings;

	return (
		<div>
			<div className="mb-2 flex items-center gap-2">
				<span>Serves {scaledServings}</span>
				<ButtonGroup>
					<Button
						onClick={handleDecrease}
						disabled={scaledServings === 1}
						variant="outline"
					>
						<Minus />
					</Button>
					<Button onClick={handleIncrease} variant="outline">
						<Plus />
					</Button>
					<Button disabled={isDefault} onClick={handleDefault} variant="outline">
						<RotateCcw />
					</Button>
				</ButtonGroup>
			</div>

			{ingredients.map((ingredient, i) => (
				<IngredientLine
					// biome-ignore lint: ok
					key={`${ingredient.name}:${i}`}
					ingredient={ingredient}
					recipeServings={defaultServings}
					scaledServings={scaledServings}
				/>
			))}
		</div>
	);
}
