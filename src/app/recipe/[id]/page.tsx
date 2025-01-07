import { Hero } from 'components/core';
import { api } from 'server/db-api';
import RecipePage from './recipe-page';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
	const { id } = await params;
	const recipe = await api.recipeById(id);

	if (recipe) return <RecipePage recipe={recipe} />;
	return <Hero title="Recipe not found" />;
}
