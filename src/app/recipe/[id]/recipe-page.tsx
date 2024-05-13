'use client'

import Recipe from 'components/Recipe/Recipe';
import type { CompleteRecipe } from 'server/api/routers/example';

const RecipePage = ({ recipe }: { recipe: CompleteRecipe }) => {
	return <Recipe recipe={recipe} />;
};

export default RecipePage;
