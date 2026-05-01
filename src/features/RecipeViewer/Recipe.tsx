import { HiOutlineClock } from 'react-icons/hi';
import { Container, Hero } from '@/components/core';
import type { Recipe as IRecipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { Directions, EditLink, Ingredients } from './Components';

interface Props {
	recipe: IRecipe;
}

export function Recipe({ recipe }: Props) {
	return (
		<>
			<Hero title={`${recipe.name}`}>
				<div className="flex gap-2">
					{recipe.author?.displayName}
					<span>·</span>
					<span className="flex gap-px items-center">
						<HiOutlineClock size={16} className="inline" /> {recipe.cookingTime}
					</span>
					{recipe.source && (
						<>
							<span>·</span>
							<a href={recipe.source} target="_blank" rel="noreferrer">
								{new URL(recipe.source).host}
							</a>
						</>
					)}
				</div>
			</Hero>
			<Container>
				<div className="grid grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid-cols-4">
					<div className="order-1 flex flex-col gap-4">
						<clientDb.SignedIn>
							<EditLink
								recipeId={recipe.id}
								recipeAuthorId={recipe.author?.id || ''}
							/>
						</clientDb.SignedIn>
						<span>{recipe.description}</span>
					</div>
					<div className="order-2 md:order-3">
						<Ingredients
							ingredients={recipe.ingredients}
							defaultServings={recipe.servings}
						/>
					</div>
					<div className="order-3 sm:col-span-2 md:order-2">
						<Directions directions={recipe.steps} />
					</div>
				</div>
			</Container>
		</>
	);
}
