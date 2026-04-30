'use client';

import type { User } from '@instantdb/react';
import { Container, Hero, T } from '@/components/core';
import RecipeList from '@/features/Account/RecipeList';
import { clientDb } from '@/lib/db';

const YourLists = ({ user }: { user: User }) => {
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

export const Account = () => {
	const user = clientDb.useUser();

	const createdAt = user.createdAt
		? new Date(user.createdAt).toLocaleDateString()
		: undefined;
	const subtitle = createdAt ? `Joined ${createdAt}` : undefined;

	console.log(user.createdAt.slice(0, 1));

	return (
		<>
			<Hero
				title={`${user?.displayName || 'New User'}'s Account`}
				subtitle={subtitle}
			/>
			<YourLists user={user} />
		</>
	);
};
