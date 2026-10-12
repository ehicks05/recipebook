import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { type Recipe, updateRecipe } from '@/functions/recipes';

export const PublishButton = ({ recipe }: { recipe: Recipe }) => {
	const router = useRouter();

	const handleClick = async () => {
		const { id, isPublished } = recipe;
		await updateRecipe({ data: { id, recipe: { isPublished: !isPublished } } });
		await router.invalidate();
	};

	return (
		<Button variant="secondary" disabled={recipe.isFeatured} onClick={handleClick}>
			{recipe.isPublished ? 'Unpublish' : 'Publish'}
		</Button>
	);
};
