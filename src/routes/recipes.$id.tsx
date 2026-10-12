import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeDetail } from '@/features/RecipeViewer/RecipeDetail';
import { getRecipe } from '@/functions/recipes';

export const Route = createFileRoute('/recipes/$id')({
	component: RouteComponent,
	loader: async ({ params: { id } }) => {
		const recipe = await getRecipe({ data: { id } });
		return recipe;
	},
});

function RouteComponent() {
	const recipe = Route.useLoaderData();

	if (!recipe) return null;

	return (
		<PageLayout>
			<RecipeDetail recipe={recipe} />
		</PageLayout>
	);
}
