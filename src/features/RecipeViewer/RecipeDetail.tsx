import { useMatchRoute } from '@tanstack/react-router';
import { Container, Hero } from '@/components/core';
import { FavoriteButton } from '@/components/core/FavoriteButton';
import type { Recipe } from '@/functions/recipes';
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
					<span>{recipe.author?.name}</span>
					<DescriptionDialog recipe={recipe} />
					{matchRoute({ to: '/recipes/$id' }) && (
						<>
							<EditLink
								recipeId={recipe.id}
								recipeAuthorId={recipe.author?.id || ''}
							/>
							<FavoriteButton
								recipeId={recipe.id}
								favoritedBy={recipe.favoritedBy}
								size="icon-sm"
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
							cookingTime={recipe.cookingTime}
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
