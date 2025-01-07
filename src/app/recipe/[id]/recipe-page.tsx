'use client';

import Recipe from 'components/Recipe/Recipe';
import type { CompleteRecipe } from 'server/db-api';

const RecipePage = ({ recipe }: { recipe: CompleteRecipe }) => {
	return <Recipe recipe={recipe} />;
};

export default RecipePage;
