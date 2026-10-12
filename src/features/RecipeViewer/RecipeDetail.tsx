import { useMatchRoute } from '@tanstack/react-router';
import { HiOutlineClock } from 'react-icons/hi';
import { Container, Hero } from '@/components/core';
import type { Recipe } from '@/functions/recipes';
import { clientDb } from '@/lib/db';
import { FavoriteButton } from '../../components/core/FavoriteButton';
import { EditLink, Ingredients, Steps } from './Components';
import { DescriptionDialog } from './Components/DescriptionDialog';

interface Props {
	recipe: Recipe;
}

export function RecipeDetail({ recipe }: Props) {
	const matchRoute = useMatchRoute();

	return (
		<>
			<Hero title={`${recipe.name}`}>
				<div className="flex flex-wrap gap-2 items-center">
					{recipe.author?.name}
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
						<>
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
						</>
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
						<Steps steps={recipe.steps} />
					</div>
				</div>
			</Container>
		</>
	);
}
