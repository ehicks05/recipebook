import { Hero } from 'components/core';
import { prisma } from 'server/db';
import { getCompleteRecipeInclude } from '../../temp';
import RecipePage from './recipe-page';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
	const { id } = await params;
	const recipe = await prisma.recipe.findUnique({
		where: { id },
		...getCompleteRecipeInclude(null),
	});

	if (recipe) return <RecipePage recipe={recipe} />;
	return <Hero title="Recipe not found" />;
}
