'use client';

import { Button, T } from 'components/core';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import type { Ingredient } from 'trpc/types';
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
				<Button isStatic>
					<T>Serves {scaledServings}</T>
				</Button>
				<div className="h-10 whitespace-nowrap">
					<Button
						className="h-full rounded-r-none"
						onClick={() => setScaledServings(scaledServings - 1)}
						disabled={scaledServings === 1}
					>
						<FaMinus />
					</Button>
					<Button
						className="h-full rounded-l-none"
						onClick={() => setScaledServings(scaledServings + 1)}
					>
						<FaPlus />
					</Button>
				</div>
			</div>

			{ingredients.map((ingredient) => (
				<IngredientLine
					key={ingredient.name}
					ingredient={ingredient}
					recipeServings={defaultServings}
					scaledServings={scaledServings}
				/>
			))}
		</div>
	);
}
