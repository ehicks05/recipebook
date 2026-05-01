import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Button } from '@/components/core';
import { clientDb } from '@/lib/db';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

interface Params {
	userId: string;
	recipeId: string;
	isFavorite: boolean;
}

export const toggleFavorite = async ({ userId, recipeId, isFavorite }: Params) => {
	try {
		clientDb.transact(
			isFavorite
				? clientDb.tx.$users[userId].unlink({ favoriteRecipes: recipeId })
				: clientDb.tx.$users[userId].link({ favoriteRecipes: recipeId }),
		);
	} catch (e) {
		const err = e instanceof Error ? e : undefined;
		return {
			err,
			title: 'Unable to update favorites',
		};
	}
	return { title: 'Favorites updated' };
};

interface Props {
	recipeId: string;
	className?: string;
	favoritedBy: { id: string }[];
}

export const FavoriteButton = ({ recipeId, className, favoritedBy }: Props) => {
	const { id: userId } = clientDb.useUser();
	const isFavorite = favoritedBy.map((o) => o.id).includes(userId);

	const Icon = isFavorite ? HiHeart : HiOutlineHeart;

	const handleClick = async () => {
		const { title, err } = await toggleFavorite({ userId, recipeId, isFavorite });

		toast({
			variant: err ? 'error' : 'success',
			title,
			description: err?.message,
		});
	};

	return (
		<Button
			className={cn('aspect-square', className)}
			onClick={async (e) => {
				e.preventDefault();
				await handleClick();
			}}
		>
			<Icon className="size-full text-red-500" />
		</Button>
	);
};
