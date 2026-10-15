import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeForm } from '@/features/RecipeForm';
import { getRecipe } from '@/functions/recipes';

export const Route = createFileRoute('/_protected/edit-recipe/$id')({
	component: RouteComponent,
	loader: async ({ params: { id } }) => {
		const recipe = await getRecipe({ data: { id } });
		if (!recipe) throw new Error('NOT_FOUND');
		return recipe;
	},
});

function RouteComponent() {
	const recipe = Route.useLoaderData();

	return (
		<PageLayout>
			<RecipeForm recipe={recipe} />
		</PageLayout>
	);
}
