import { useUser } from '@clerk/nextjs';
import RecipeList from 'components/MyAccount/RecipeList';
import { Card, Container, Hero, Loading, T } from 'components/core';
import React from 'react';
import { api } from 'utils/api';

const YourLists = () => {
	const { user } = useUser();
	const id = user?.id;
	if (!id) {
		return null;
	}

	const authoredRecipes = api.example.findRecipesByAuthorId.useQuery({
		id,
	}).data;
	const favoriteRecipes = api.example.findFavoriteRecipesByUserId
		.useQuery({
			id,
		})
		.data?.map((o) => o.recipe);

	return (
		<Container>
			<T className="text-xl">Your Lists</T>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
				<RecipeList recipes={authoredRecipes} title="Your Recipes" />
				<RecipeList recipes={favoriteRecipes} title="Your Favorites" />
			</div>
		</Container>
	);
};

const MyAccount = () => {
	const user = useUser();
	const { data: appUser, isLoading, isError } = api.example.findAppUser.useQuery();
	if (isLoading) {
		return <Loading />;
	}
	if (isError || !appUser) {
		return (
			<Card>
				<T>Log in to view account info</T>
			</Card>
		);
	}

	return (
		<>
			<Hero
				title={`${appUser?.displayName || 'New User'}'s Account`}
				subtitle={`Joined ${appUser.createdAt.toLocaleDateString()}`}
			/>
			<YourLists />
		</>
	);
};

export default MyAccount;
