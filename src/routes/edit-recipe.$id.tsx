import { createFileRoute } from '@tanstack/react-router';
import { RecipeForm } from '@/components/RecipeForm';
import { clientDb } from '@/lib/db';

export const Route = createFileRoute('/edit-recipe/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const { data } = clientDb.useQuery({
		recipes: {
			$: { where: { id } },
			ingredients: {},
			author: {},
			image: {},
			favoritedBy: {},
		},
	});

	const { recipes } = data || {};
	const recipe = recipes?.[0];

	if (!recipe) return null;

	return <RecipeForm recipe={recipe} />;
}
