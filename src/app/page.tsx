import { auth } from '@clerk/nextjs/server';
import RecipePicker from 'components/Home/RecipePicker';
import { Container, Hero } from 'components/core';
import type { Metadata } from 'next';
import { prisma } from 'server/db';
import { getCompleteRecipeInclude } from './temp';

const isPublishedClause = (userId: string | null | undefined) => ({
	OR: [{ isPublished: true }, ...(userId ? [{ authorId: userId }] : [])],
});

export const metadata: Metadata = {
	title: 'RecipeBook',
};

export default async function Page() {
	const start = new Date().getTime();

	console.log(`start auth ${new Date().getTime() - start}`);
	const { userId } = await auth();
	console.log(`  end auth ${new Date().getTime() - start}`);

	console.log(`start recipeQuery ${new Date().getTime() - start}`);
	const recipes = await prisma.recipe.findMany({
		where: isPublishedClause(userId),
		orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
		...getCompleteRecipeInclude(userId),
	});
	console.log(`  end recipeQuery ${new Date().getTime() - start}`);

	console.log(`end ${new Date().getTime() - start}`);

	return (
		<>
			<Hero title="Find a Recipe" />
			<Container>
				<RecipePicker recipes={recipes} />
			</Container>
		</>
	);
}
