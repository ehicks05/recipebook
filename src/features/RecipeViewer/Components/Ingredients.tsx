'use client';

import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from '@/components/core';
import type { Ingredient } from '@/instant.types';
import { IngredientLine } from './Ingredient';

interface Props {
	ingredients: Ingredient[];
	defaultServings: number;
}

export function Ingredients({ ingredients, defaultServings }: Props) {
	const [scaledServings, setScaledServings] = useState(defaultServings);

	return (
		<div>
			<div className="mb-2 flex items-center gap-2">
				<span>Serves {scaledServings}</span>
				<div className="flex">
					<Button
						className="rounded-r-none"
						onClick={() => setScaledServings(scaledServings - 1)}
						disabled={scaledServings === 1}
					>
						<FaMinus />
					</Button>
					<Button
						className="rounded-l-none"
						onClick={() => setScaledServings(scaledServings + 1)}
					>
						<FaPlus />
					</Button>
				</div>
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
