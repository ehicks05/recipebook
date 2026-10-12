import { useRouter } from '@tanstack/react-router';
import type { VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button, type buttonVariants } from '@/components/ui/button';
import { toggleFavorite } from '@/functions/recipes';
import { authClient } from '@/lib/auth-client';

interface Props {
	recipeId: string;
	size?: VariantProps<typeof buttonVariants>['size'];
	favoritedBy: { id: string }[];
}

export const FavoriteButton = ({ recipeId, size = 'icon', favoritedBy }: Props) => {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const userId = session?.user.id;
	if (!userId) return null;

	const isFavorite = favoritedBy.map((o) => o.id).includes(userId);

	const handleClick = async () => {
		try {
			await toggleFavorite({ data: { recipeId } });
			await router.invalidate();
		} catch (e) {
			const err = e instanceof Error ? e : undefined;
			toast.error('Unable to update favorite', {
				description: err?.message,
			});
		}
	};

	return (
		<Button
			size={size}
			variant="outline"
			onClick={async (e) => {
				e.preventDefault();
				await handleClick();
			}}
		>
			<Heart className={cn('text-red-500', isFavorite && 'fill-red-500')} />
		</Button>
	);
};
