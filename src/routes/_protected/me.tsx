import { createFileRoute } from '@tanstack/react-router';
import { Account } from '@/features/Account/Account';
import { getFavoritesByUser, getRecipesByUser } from '@/functions/recipes';

export const Route = createFileRoute('/_protected/me')({
	component: RouteComponent,
	loader: async () => {
		const recipes = await getRecipesByUser();
		const favorites = await getFavoritesByUser();

		return { recipes, favorites };
	},
});

function RouteComponent() {
	const { user } = Route.useRouteContext();
	const { recipes, favorites } = Route.useLoaderData();
	return <Account user={user} recipes={recipes} favorites={favorites} />;
}
