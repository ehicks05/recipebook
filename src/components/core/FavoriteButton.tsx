import { useRouter } from '@tanstack/react-router';
import { cn } from 'cn';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button, type ButtonParams } from '@/components/ui/button';
import { toggleFavorite } from '@/functions/recipes';
import { authClient } from '@/lib/auth-client';

type Props = ButtonParams & {
	recipeId: string;
	favoritedBy: { id: string }[];
};

export const FavoriteButton = ({ recipeId, favoritedBy, ...props }: Props) => {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	if (!session) return null;

	const isFavorite = Object.keys(favoritedBy).length !== 0;

	const handleClick = async () => {
		try {
			await toggleFavorite({ data: { recipeId } });
			await router.invalidate();
		} catch (e) {
			const err = e instanceof Error ? e : undefined;
			toast.error('Unable to update favorite', { description: err?.message });
		}
	};

	return (
		<Button
			variant="outline"
			onClick={async (e) => {
				e.preventDefault();
				await handleClick();
			}}
			{...props}
		>
			<Heart className={cn('text-red-500', isFavorite && 'fill-red-500')} />
		</Button>
	);
};
