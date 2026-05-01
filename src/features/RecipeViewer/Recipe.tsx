import { HiOutlineClock } from 'react-icons/hi';
import { Container, Hero } from '@/components/core';
import type { Recipe as IRecipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { FavoriteButton } from '../RecipeBrowser/FavoriteButton';
import { Directions, EditLink, Ingredients } from './Components';

interface Props {
	recipe: IRecipe;
}

export function Recipe({ recipe }: Props) {
	return (
		<>
			<Hero title={`${recipe.name}`}>
				<div className="flex flex-wrap gap-2 items-center">
					{recipe.author?.displayName}
					<span>·</span>
					<span className="flex gap-px items-center">
						<HiOutlineClock size={16} className="inline" /> {recipe.cookingTime}
					</span>
					{recipe.source && (
						<>
							<span>·</span>
							<a
								href={recipe.source}
								target="_blank"
								rel="noreferrer"
								className="underline"
							>
								{new URL(recipe.source).host.split('.').slice(-2).join('.')}
							</a>
						</>
					)}
					<clientDb.SignedIn>
						<span>·</span>
						<EditLink
							recipeId={recipe.id}
							recipeAuthorId={recipe.author?.id || ''}
						/>
					</clientDb.SignedIn>
					<span>·</span>
					<FavoriteButton
						recipeId={recipe.id}
						favoritedBy={recipe.favoritedBy}
						className="size-7 p-1"
					/>
				</div>
			</Hero>
			<Container>
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<div className="order-1 flex flex-col gap-4 max-w-xs min-w-48">
						<span>{recipe.description}</span>
					</div>
					<div className="order-2 md:order-3 w-sm min-w-64">
						<Ingredients
							ingredients={recipe.ingredients}
							defaultServings={recipe.servings}
						/>
					</div>
					<div className="order-3 sm:col-span-2 md:order-2 max-w-3xl">
						<Directions directions={recipe.steps} />
					</div>
				</div>
			</Container>
		</>
	);
}
