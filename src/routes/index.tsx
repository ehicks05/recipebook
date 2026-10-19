import { createFileRoute } from '@tanstack/react-router';
import { RecipeBrowser } from '@/features/RecipeBrowser/RecipeBrowser';
import { getRecipes } from '@/functions/recipes.functions';

export const Route = createFileRoute('/')({
	component: App,
	loader: async () => {
		const recipes = await getRecipes();
		return recipes;
	},
});

function App() {
	const recipes = Route.useLoaderData();

	return <RecipeBrowser recipes={recipes} />;
}
