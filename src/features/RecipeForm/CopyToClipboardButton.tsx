import { HiClipboardCopy } from 'react-icons/hi';
import type { Ingredient, Recipe } from '@/instant.types';
import { toast } from '@/lib/toast';
import { Button } from '../../components/core';

function updateClipboard(newClip: string) {
	navigator.clipboard.writeText(newClip).then(
		(e) => console.log(e),
		(e) => console.log(e),
	);
}

function stripRecipe(recipe: Recipe) {
	return {
		...recipe,
		id: undefined,
		createdAt: undefined,
		updatedAt: undefined,
		author: undefined,
		ingredients: recipe.ingredients.map((i: Ingredient) => ({
			...i,
			id: undefined,
		})),
	};
}

export const CopyToClipboardButton = ({ recipe }: { recipe: Recipe }) => {
	return (
		<Button
			onClick={() => {
				updateClipboard(JSON.stringify(recipe, null, 2));
				toast({ variant: 'neutral', title: 'Copied to clipboard' });
			}}
		>
			Export JSON
			<HiClipboardCopy title="Copy to Clipboard" />
		</Button>
	);
};
