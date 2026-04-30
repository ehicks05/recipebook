'use client';

import type { User } from '@instantdb/react';
import { Container, Hero, T } from '@/components/core';
import RecipeList from '@/features/Account/RecipeList';
import { clientDb } from '@/lib/db';

const YourLists = async ({ user }: { user: User }) => {
	const { data: myRecipesData } = clientDb.useQuery({
		recipes: {
			$: { where: { 'author.id': user.id } },
			author: {},
			favoritedBy: {},
			image: {},
			ingredients: {},
		},
	});
	const { data: myFavoritesData } = clientDb.useQuery({
		recipes: {
			$: { where: { 'favoritedBy.id': user.id } },
			author: {},
			favoritedBy: {},
			image: {},
			ingredients: {},
		},
	});

	const favoriteRecipes = myFavoritesData?.recipes || [];
	const authoredRecipes = myRecipesData?.recipes || [];

	return (
		<Container>
			<T className="text-xl">Your Lists</T>
			<div>
				<RecipeList recipes={authoredRecipes} title="My Recipes" />
			</div>
			<div>
				<RecipeList recipes={favoriteRecipes} title="My Favorites" />
			</div>
		</Container>
	);
};

export const Account = async () => {
	const user = clientDb.useUser();

	return (
		<>
			<Hero
				title={`${user.displayName || 'New User'}'s Account`}
				subtitle={`Joined ${user.createdAt?.toLocaleDateString()}`}
			/>
			<YourLists user={user} />
		</>
	);
};
