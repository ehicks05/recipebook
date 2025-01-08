import Recipe from 'components/Recipe/Recipe';
import { Hero } from 'components/core';
import { api } from 'server/db-api';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
	const { id } = await params;
	const recipe = await api.recipeById(id);

	if (recipe) return <Recipe recipe={recipe} />;
	return <Hero title="Recipe not found" />;
}
