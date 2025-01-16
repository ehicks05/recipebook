import Recipe from 'components/Recipe/Recipe';
import { notFound } from 'next/navigation';
import { db } from 'server/db-api';

export const revalidate = 86400; // 1 day
export const dynamicParams = true;

export async function generateStaticParams() {
	const recipes = await db.recipes.recipes(null);
	return recipes.map((recipe) => ({ id: recipe.id }));
}

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
	const { id } = await params;
	const recipe = await db.recipes.recipeById(id);

	if (!recipe) return notFound();

	return <Recipe recipe={recipe} />;
}
