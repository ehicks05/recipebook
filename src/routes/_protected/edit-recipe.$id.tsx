import { createFileRoute, notFound } from '@tanstack/react-router';
import { RecipeForm } from '@/features/RecipeForm';
import { getRecipe } from '@/functions/recipes';

export const Route = createFileRoute('/_protected/edit-recipe/$id')({
	component: RouteComponent,
	loader: async ({ params: { id } }) => {
		const recipe = await getRecipe({ data: { id } });
		if (!recipe) throw notFound();
		return recipe;
	},
});

function RouteComponent() {
	const recipe = Route.useLoaderData();

	return <RecipeForm recipe={recipe} />;
}
