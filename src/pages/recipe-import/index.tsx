import Recipe from 'components/Recipe/Recipe';
import { RecipeForm } from 'components/RecipeForm';
import { Alert, Button, Container, Loading, MyInput, T } from 'components/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from 'utils/api';
import { parseLdJsonRecipe } from 'utils/recipe-import';

const RecipeImportPage: NextPage = () => {
	const router = useRouter();
	const { url } = router.query;
	const [mode, setMode] = useState<'view' | 'edit'>('view');

	const {
		isFetching,
		error,
		data: recipeHtml,
	} = api.example.importRecipe.useQuery(
		{ url: url as string },
		{
			enabled: !!(url && url.length > 4),
			staleTime: 10 * (60 * 1000), // 10 mins
			cacheTime: 15 * (60 * 1000), // 15 mins
		},
	);

	const handleChange = (url: string) => {
		void router.push(`recipe-import?url=${url}`);
		return null;
	};

	const recipe = parseLdJsonRecipe(recipeHtml || '', (url as string) || '');

	return (
		<>
			{!url && (
				<Container>
					<Alert variant="info" title="What is this page?">
						<div className="max-w-prose">
							Here you can paste the url of a recipe from the web. If it includes
							web-friendly metadata, you will be able to see it here.
							<br />
							<br />
							Check the imported recipe carefully! Depending on how the website
							formats their metadata, imported recipes can wind up with parts missing
							or garbled.
						</div>
					</Alert>
				</Container>
			)}
			<Container>
				<div className="flex items-start">
					<MyInput
						className=""
						placeholder="enter a recipe url"
						value={url || ''}
						onChange={(e) => handleChange(e.target.value)}
					/>
					<Button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
						{mode === 'edit' ? 'View' : 'Edit'}
					</Button>
				</div>
			</Container>
			{error && (
				<Container>
					<T>{error.message}</T>
				</Container>
			)}
			{isFetching && <Loading />}
			{recipe && mode === 'view' && <Recipe recipe={recipe} />}
			{recipe && mode === 'edit' && <RecipeForm importedRecipe={recipe} />}
			{(error || (url && !recipeHtml && !isFetching)) && (
				<div className="m-3">
					<Alert variant="error" title={'Unable to fetch recipe'} description={''} />
				</div>
			)}
			{recipeHtml && !recipe && (
				<div className="m-3">
					<Alert variant="error" title={'Unable to parse recipe'} description={''} />
				</div>
			)}
			{/* <pre className="text-sm p-4 text-white">
        {JSON.stringify(recipe, null, 2)}
      </pre> */}
		</>
	);
};

export default RecipeImportPage;
