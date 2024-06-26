import type { MouseEvent } from 'react';
import React from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

import { useUser } from '@clerk/nextjs';
import { Alert, Button } from 'components/core';
import toast from 'react-hot-toast';
import { api } from 'utils/api';

interface Props {
	recipeId: string;
	className?: string;
}

const FavoriteButton = ({ recipeId, className }: Props) => {
	const { user } = useUser();
	const id = user?.id || '';

	const { data: userFavorites, refetch: refetchUserFavorites } =
		api.example.findFavoriteRecipesByUserId.useQuery({ id });
	const favoriteIds = userFavorites?.map((o) => o.recipeId) || [];
	const isFavorite = favoriteIds.includes(recipeId);

	const createUserFavorite = api.example.createUserFavorite.useMutation();
	const deleteUserFavorite = api.example.deleteUserFavorite.useMutation();
	const toggle = isFavorite ? deleteUserFavorite : createUserFavorite;

	const Icon = isFavorite ? HiHeart : HiOutlineHeart;

	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		toggle.mutate(
			{ recipeId },
			{
				onSettled: (_, err) => {
					void refetchUserFavorites();
					const title = err
						? `Unable to ${
								isFavorite ? 'remove recipe from' : 'add recipe to'
							} favorites`
						: `Recipe ${isFavorite ? 'removed from' : 'added to'} favorites`;
					toast.custom((t) => (
						<Alert
							variant={err ? 'error' : 'success'}
							title={title}
							description={err?.message}
							className={t.visible ? 'animate-enter' : 'animate-leave'}
						/>
					));
				},
			},
		);
	};

	return (
		<Button className={className} onClick={(e) => handleClick(e)}>
			<Icon className="text-xl text-red-500" />
		</Button>
	);
};

export default FavoriteButton;
