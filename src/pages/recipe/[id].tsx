import Recipe from 'components/Recipe/Recipe';
import { Hero } from 'components/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from 'utils/api';

const RecipePage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const {
		isLoading,
		error,
		data: recipe,
	} = api.example.findRecipe.useQuery({ id: id as string }, { enabled: !!id });

	if (recipe) return <Recipe recipe={recipe} />;
	if (isLoading) return <Hero title="Loading..." />;
	if (error) return <Hero title="Error..." subtitle={error.message} />;
	return <Hero title="Recipe not found" />;
};

export default RecipePage;
