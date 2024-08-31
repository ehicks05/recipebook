import { useAuth } from '@clerk/nextjs';
import { Alert, Button } from 'components/core';
import { revalidatePath } from 'next/cache';
import React from 'react';
import toast from 'react-hot-toast';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { toggleFavorite } from './actions';

interface Props {
	recipeId: string;
	className?: string;
	isUserFavorite: boolean;
}

const FavoriteButton = ({ recipeId, className, isUserFavorite }: Props) => {
	const { userId } = useAuth();
	if (!userId) return null;

	const Icon = isUserFavorite ? HiHeart : HiOutlineHeart;

	const handleClick = async () => {
		const { title, err } = await toggleFavorite({ userId, recipeId });

		toast.custom((t) => (
			<Alert
				variant={err ? 'error' : 'success'}
				title={title}
				description={err?.message}
				className={t.visible ? 'animate-enter' : 'animate-leave'}
			/>
		));
	};

	return (
		<Button className={className} onClick={async (e) => {
			e.preventDefault();
			await handleClick();
		}}>
			<Icon className="text-xl text-red-500" />
		</Button>
	);
};

export default FavoriteButton;
