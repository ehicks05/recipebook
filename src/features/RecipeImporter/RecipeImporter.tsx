'use client';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Alert, Button, Container, Loading, MyInput, T } from '@/components/core';
import { Recipe } from '@/components/Recipe/Recipe';
import { RecipeForm } from '@/components/RecipeForm';
import { parseLdJsonRecipe } from '@/features/RecipeImporter/server';
import { clientDb } from '@/lib/db';
import { Instructions } from './Instructions';

export const RecipeImporter = ({ url }: { url?: string }) => {
	const { id: userId } = clientDb.useUser();
	const navigate = useNavigate();
	const [mode, setMode] = useState<'view' | 'edit'>('view');

	const {
		isFetching,
		error,
		data: recipeHtml,
	} = api.example.importRecipe.useQuery(
		{ url: url as string },
		{
			enabled: !!(url && url.length > 4),
			staleTime: 1000 * 60 * 10, // 10 mins
		},
	);

	const handleChange = (url: string) => {
		void navigate({ to: `/recipe-import?url=${url}` });
		return null;
	};

	const recipe = parseLdJsonRecipe(recipeHtml || '', (url as string) || '');

	return (
		<>
			{!url && <Instructions />}
			<Container>
				<div className="flex items-start gap-1">
					<MyInput
						className=""
						placeholder="enter a recipe url"
						value={url || ''}
						onChange={(e) => handleChange(e.target.value)}
					/>
					{userId && (
						<Button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
							{mode === 'edit' ? 'View' : 'Edit'}
						</Button>
					)}
					{!userId && <Button disabled>Sign in to edit and save</Button>}
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
			{/* <pre className="text-sm p-4 text-white">{JSON.stringify(recipe, null, 2)}</pre> */}
		</>
	);
};
