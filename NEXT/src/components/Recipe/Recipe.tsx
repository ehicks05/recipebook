import { Container, Hero, T } from 'components/core';
import React from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import type { RecipeFull } from 'trpc/types';
import { Directions, EditLink, Ingredients } from './Components';

interface Props {
	recipe: RecipeFull;
}

function Recipe({ recipe }: Props) {
	return (
		<>
			<Hero title={`${recipe.name}`}>
				<T className="text-sm font-semibold">
					<div className="">
						{recipe.author.displayName} |{' '}
						<HiOutlineClock size={16} className="inline dark:text-neutral-200" />{' '}
						{recipe.cookingTime}
					</div>
				</T>
			</Hero>
			<Container>
				<div className="grid grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid-cols-4">
					<div className="order-1 flex flex-col gap-4">
						<EditLink recipeId={recipe.id} recipeAuthorId={recipe.authorId} />
						<T>{recipe.description}</T>
						{recipe.source && (
							<T className="block text-sm font-semibold">
								<span className="font-normal">from</span>{' '}
								<a href={recipe.source} target="_blank" rel="noreferrer">
									{new URL(recipe.source).host}
								</a>
							</T>
						)}
					</div>
					<div className="order-2 md:order-3">
						<Ingredients
							ingredients={recipe.ingredients}
							defaultServings={recipe.servings}
						/>
					</div>
					<div className="order-3 sm:col-span-2 md:order-2">
						<Directions directions={recipe.directions} />
					</div>
				</div>
			</Container>
		</>
	);
}

export default Recipe;
