import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import type { Ingredient } from '@/functions/recipes';
import { IngredientLine } from './Ingredient';

interface Props {
	ingredients: Ingredient[];
	defaultServings: number;
	cookingTime: string;
}

export function Ingredients({ ingredients, defaultServings, cookingTime }: Props) {
	const [scaledServings, setScaledServings] = useState(defaultServings);

	const handleDecrease = () => setScaledServings(scaledServings - 1);
	const handleIncrease = () => setScaledServings(scaledServings + 1);

	return (
		<div>
			<div className="mb-2 flex items-center gap-2">
				<span>Serves {scaledServings}</span>
				<ButtonGroup>
					<Button
						onClick={handleDecrease}
						disabled={scaledServings === 1}
						variant="secondary"
					>
						<Minus />
					</Button>
					<Button onClick={handleIncrease} variant="secondary">
						<Plus />
					</Button>
				</ButtonGroup>
				Time: {cookingTime}
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
