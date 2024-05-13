import { Hero } from 'components/core';
import RecipePage from './recipe-page'
import { prisma } from 'server/db';

export const completeRecipeInclude = {
  include: {
    author: true,
    directions: true,
    ingredients: true,
  },
};

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    ...completeRecipeInclude,
  });

  if (recipe) return <RecipePage recipe={recipe} />
  return <Hero title="Recipe not found" />;
}