import { createFileRoute, notFound } from '@tanstack/react-router';
import { RecipeDetail } from '@/features/RecipeViewer/RecipeDetail';
import { getRecipe } from '@/functions/recipes';

export const Route = createFileRoute('/recipes/$id')({
	component: RouteComponent,
	loader: async ({ params: { id } }) => {
		const recipe = await getRecipe({ data: { id } });
		if (!recipe) throw notFound();
		return recipe;
	},
});

function RouteComponent() {
	const recipe = Route.useLoaderData();

	return <RecipeDetail recipe={recipe} />;
}
