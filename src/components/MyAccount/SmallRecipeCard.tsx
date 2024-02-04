import { Card, T } from 'components/core';
import Link from 'next/link';
import React from 'react';
import type { CompleteRecipe } from 'server/api/routers/example';

interface ISmallRecipeCardProps {
	recipe: CompleteRecipe;
}

function SmallRecipeCard({
	recipe: { id, emoji, name, author },
}: ISmallRecipeCardProps) {
	return (
		<div className="">
			<Link href={`/recipe/${id}`}>
				<Card className="lift">
					<div className="flex flex-col">
						<div className="flex gap-4">
							<figure className="h-16 w-16 pt-2 text-5xl">{emoji}</figure>
							<div className="w-full">
								<div>
									<T className="font-semibold">{name}</T>
								</div>
								<T className="text-xs italic">{author.displayName}</T>
							</div>
						</div>
					</div>
				</Card>
			</Link>
		</div>
	);
}

export default SmallRecipeCard;
