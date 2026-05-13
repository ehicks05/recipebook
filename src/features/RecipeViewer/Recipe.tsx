import { useMatchRoute } from '@tanstack/react-router';
import { HiOutlineClock } from 'react-icons/hi';
import { Container, Hero } from '@/components/core';
import type { Recipe as IRecipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { FavoriteButton } from '../../components/core/FavoriteButton';
import { Directions, EditLink, Ingredients } from './Components';
import { DescriptionDialog } from './Components/DescriptionDialog';

interface Props {
	recipe: IRecipe;
}

export function Recipe({ recipe }: Props) {
	const matchRoute = useMatchRoute();

	return (
		<>
			<Hero title={`${recipe.name}`}>
				<div className="flex flex-wrap gap-2 items-center">
					{recipe.author?.displayName}
					<span>·</span>
					<span className="flex gap-px items-center">
						<HiOutlineClock size={16} className="inline" /> {recipe.cookingTime}
					</span>
					<span>·</span>
					<DescriptionDialog description={recipe.description} />
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
					{matchRoute({ to: '/recipes/$id' }) && (
						<clientDb.SignedIn>
							<span>·</span>
							<EditLink
								recipeId={recipe.id}
								recipeAuthorId={recipe.author?.id || ''}
							/>
							<span>·</span>
							<FavoriteButton
								recipeId={recipe.id}
								favoritedBy={recipe.favoritedBy}
								className="size-7 p-1"
							/>
						</clientDb.SignedIn>
					)}
				</div>
			</Hero>
			<Container>
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<div className="order-1 md:order-2 min-w-64 max-w-3xl">
						<Ingredients
							ingredients={recipe.ingredients}
							defaultServings={recipe.servings}
						/>
					</div>
					<div className="order-2 md:order-1 max-w-3xl">
						<Directions directions={recipe.steps} />
					</div>
				</div>
			</Container>
		</>
	);
}
