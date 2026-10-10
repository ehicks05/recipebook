import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeBrowser } from '@/features/RecipeBrowser/RecipeBrowser';
import { getRecipes } from '@/functions/recipes';

export const Route = createFileRoute('/')({
	component: App,
	loader: async () => {
		const recipes = await getRecipes();
		return recipes;
	},
});

function App() {
	const recipes = Route.useLoaderData();

	return (
		<PageLayout>
			<RecipeBrowser recipes={recipes} />
		</PageLayout>
	);
}
