import { auth } from '@clerk/nextjs/server';
import RecipePicker from 'components/Home/RecipePicker';
import { Container, Hero } from 'components/core';
import type { Metadata } from 'next';
import { prisma } from 'server/db';
import { completeRecipeInclude } from './recipe/[id]/page';

const isPublishedClause = (userId: string | null | undefined) => ({
	OR: [{ isPublished: true }, ...(userId ? [{ authorId: userId }] : [])],
});

export const metadata: Metadata = {
	title: 'RecipeBook',
};

export default async function Page() {
	const { userId } = await auth();

	const _recipes = await prisma.recipe.findMany({
		where: isPublishedClause(userId),
		orderBy: { createdAt: 'desc' },
		...completeRecipeInclude,
	});
	const recipeOfTheDayId = (await prisma.featuredRecipe.findFirst())?.id || '';
	const recipes = _recipes.sort((o1, o2) =>
		o1.id === recipeOfTheDayId ? -1 : o2.id === recipeOfTheDayId ? 1 : 0,
	);

	return (
		<>
			<Hero title="Find a Recipe" />
			<Container>
				<RecipePicker recipes={recipes} recipeOfTheDayId={recipeOfTheDayId} />
			</Container>
		</>
	);
}
