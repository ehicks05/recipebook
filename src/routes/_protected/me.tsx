import { createFileRoute, useRouteContext } from '@tanstack/react-router';
import { Account } from '@/features/Account/Account';
import { getFavoritesByUser, getRecipesByUser } from '@/functions/recipes.functions';

export const Route = createFileRoute('/_protected/me')({
	component: RouteComponent,
	loader: async () => {
		const recipes = await getRecipesByUser();
		const favorites = await getFavoritesByUser();

		return { recipes, favorites };
	},
});

function RouteComponent() {
	const { session } = useRouteContext({ from: '/_protected' });
	const { recipes, favorites } = Route.useLoaderData();
	return <Account user={session.user} recipes={recipes} favorites={favorites} />;
}
