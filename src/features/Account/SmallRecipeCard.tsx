import { Link } from '@tanstack/react-router';
import { Card, T } from '@/components/core';
import type { Recipe } from '@/instant.types';

interface Props {
	recipe: Recipe;
}

function SmallRecipeCard({ recipe: { id, emoji, name, author } }: Props) {
	return (
		<div className="">
			<Link to="/recipes/$id" params={{ id }}>
				<Card className="lift">
					<div className="flex flex-col">
						<div className="flex gap-4">
							<figure className="h-16 w-16 pt-2 text-5xl">{emoji}</figure>
							<div className="w-full">
								<div>
									<T className="font-semibold">{name}</T>
								</div>
								<T className="text-xs italic">{author?.displayName}</T>
							</div>
						</div>
					</div>
				</Card>
			</Link>
		</div>
	);
}

export default SmallRecipeCard;
