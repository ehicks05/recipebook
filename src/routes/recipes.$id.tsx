import { createFileRoute } from '@tanstack/react-router';
import { Recipe } from '@/features/RecipeViewer/Recipe';
import { clientDb } from '@/lib/db';

export const Route = createFileRoute('/recipes/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const { data } = clientDb.useQuery({
		recipes: {
			$: { where: { id } },
			author: {},
			ingredients: {},
			favoritedBy: {},
			image: {},
		},
	});
	const recipe = data?.recipes[0];

	if (!recipe) return null;

	return <Recipe recipe={recipe} />;
}
