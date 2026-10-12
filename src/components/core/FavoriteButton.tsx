import { useRouter } from '@tanstack/react-router';
import { cn } from 'cn';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Button } from '@/components/core';
import { toggleFavorite } from '@/functions/recipes';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/lib/toast';

interface Props {
	recipeId: string;
	className?: string;
	favoritedBy: { id: string }[];
}

export const FavoriteButton = ({ recipeId, className, favoritedBy }: Props) => {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const userId = session?.user.id;
	if (!userId) return null;

	const isFavorite = favoritedBy.map((o) => o.id).includes(userId);
	const Icon = isFavorite ? HiHeart : HiOutlineHeart;

	const handleClick = async () => {
		try {
			await toggleFavorite({ data: { recipeId } });
			await router.invalidate();
		} catch (e) {
			const err = e instanceof Error ? e : undefined;
			toast({
				variant: 'error',
				title: 'Unable to update favorite',
				description: err?.message,
			});
		}
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
