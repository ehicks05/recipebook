'use client';

import type { User } from '@instantdb/react';
import { Container, Hero } from '@/components/core';
import { RecipeList } from '@/features/Account/RecipeList';
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
			<div className="flex flex-col gap-4">
				<RecipeList recipes={authoredRecipes} title="My Recipes" />

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
	const subtitle = createdAt
		? `${user?.displayName || 'New User'} Joined ${createdAt}`
		: undefined;

	return (
		<>
			<Hero title="Account" subtitle={subtitle} />
			<YourLists user={user} />
		</>
	);
};
