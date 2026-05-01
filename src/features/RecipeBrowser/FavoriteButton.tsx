import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Button } from '@/components/core';
import { clientDb } from '@/lib/db';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { toggleFavorite } from './toggleFavorite';

interface Props {
	recipeId: string;
	className?: string;
	favoritedBy: { id: string }[];
}

export const FavoriteButton = ({ recipeId, className, favoritedBy }: Props) => {
	const { id: userId } = clientDb.useUser();
	const isUserFavorite = favoritedBy.map((o) => o.id).includes(userId);

	const Icon = isUserFavorite ? HiHeart : HiOutlineHeart;

	const handleClick = async () => {
		const { title, err } = await toggleFavorite({
			userId,
			recipeId,
			isUserFavorite,
		});

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
