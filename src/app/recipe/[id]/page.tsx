import { Hero } from 'components/core';
import { prisma } from 'server/db';
import { getCompleteRecipeInclude } from '../../temp';
import RecipePage from './recipe-page';

export default async function Page({ params }: { params: { id: string } }) {
	const id = (await params).id;
	const recipe = await prisma.recipe.findUnique({
		where: { id },
		...getCompleteRecipeInclude(null),
	});

	if (recipe) return <RecipePage recipe={recipe} />;
	return <Hero title="Recipe not found" />;
}
