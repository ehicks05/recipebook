import { auth } from '@clerk/nextjs/server';
import RecipeList from 'components/MyAccount/RecipeList';
import { Card, Container, Hero, T } from 'components/core';
import React from 'react';
import { api } from 'trpc/server';

const YourLists = async ({ userId }: { userId: string }) => {
	const [favoriteRecipes, authoredRecipes] = await Promise.all([
		api.example.myFavorites(),
		api.example.myRecipes(),
	]);

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

const NotLoggedIn = () => (
	<Card>
		<T>Log in to view account info</T>
	</Card>
);

const MyStuff = async () => {
	const { userId } = await auth();
	if (!userId) {
		return <NotLoggedIn />;
	}
	const appUser = userId && (await api.example.findAppUser());
	if (!appUser) {
		return <NotLoggedIn />;
	}

	return (
		<>
			<Hero
				title={`${appUser?.displayName || 'New User'}'s Account`}
				subtitle={`Joined ${appUser.createdAt.toLocaleDateString()}`}
			/>
			<YourLists userId={userId} />
		</>
	);
};

export default MyStuff;
