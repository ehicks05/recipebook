import { Link } from '@tanstack/react-router';
import { Card, T } from '@/components/core';
import type { Recipe } from '@/instant.types';

interface Props {
	recipe: Recipe;
}

function SmallRecipeCard({ recipe: { id, emoji, name } }: Props) {
	return (
		<Link to="/recipes/$id" params={{ id }}>
			<Card className="p-2 py-1">
				<div className="flex items-center gap-4">
					<figure className="flex items-center justify-center size-8 text-2xl">
						{emoji}
					</figure>
					<div className="w-full">
						<T className="text-sm line-clamp-1">{name}</T>
					</div>
				</div>
			</Card>
		</Link>
	);
}

export default SmallRecipeCard;
