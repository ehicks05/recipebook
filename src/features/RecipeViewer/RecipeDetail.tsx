import { useMatchRoute } from '@tanstack/react-router';
import { Clock } from 'lucide-react';
import { Container, Hero } from '@/components/core';
import { FavoriteButton } from '@/components/core/FavoriteButton';
import type { Recipe } from '@/functions/recipes.functions';
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
				<div className="flex gap-1">
					{recipe.author.name}
					<span>·</span>
					<div className="flex gap-1 items-center">
						<Clock size={16} />
						{recipe.cookingTime}
					</div>
				</div>
			</Hero>
			<Container className="max-w-full w-full bg-sidebar px-0">
				<div className="max-w-screen-2xl mx-auto flex gap-2 px-4">
					<DescriptionDialog recipe={recipe} />
					{matchRoute({ to: '/recipes/$id' }) && (
						<>
							<EditLink recipeId={recipe.id} recipeAuthorId={recipe.authorId} />
							<FavoriteButton
								recipeId={recipe.id}
								favoritedBy={recipe.favoritedBy}
								size="icon"
							/>
						</>
					)}
				</div>
			</Container>
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
