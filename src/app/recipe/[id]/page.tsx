import Recipe from 'components/Recipe/Recipe';
import { notFound } from 'next/navigation';
import { api } from 'server/db-api';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
	const { id } = await params;
	const recipe = await api.recipeById(id);

	if (!recipe) return notFound();

	return <Recipe recipe={recipe} />;
}
