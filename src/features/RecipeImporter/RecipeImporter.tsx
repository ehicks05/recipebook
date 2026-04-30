'use client';
import { useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import z, { type ZodError } from 'zod';
import { Alert, Button, Container, Loading, MyInput, T } from '@/components/core';
import { Recipe } from '@/components/Recipe/Recipe';
import { RecipeForm } from '@/components/RecipeForm';
import { parseLdJsonRecipe } from '@/features/RecipeImporter/server';
import { clientDb } from '@/lib/db';
import { fetchHtml } from '@/middleware/fetchHtml';
import { Instructions } from './Instructions';

const urlSchema = z.url({ protocol: /^https?$/ });

const useFetchHtml = (_url?: string) => {
	const fetchHtmlFetch = useServerFn(fetchHtml);
	const [html, setHtml] = useState<Awaited<
		ReturnType<typeof fetchHtmlFetch>
	> | null>(null);
	const [urlError, setUrlError] = useState<ZodError<string> | null>(null);

	useEffect(() => {
		const { data: url, error } = urlSchema.safeParse(_url);
		if (error) {
			setUrlError(error);
			setHtml(null);
		}
		if (url) {
			setUrlError(null);
			fetchHtmlFetch({ data: { url } }).then(setHtml);
		}
	}, [fetchHtmlFetch, _url]);

	return { html, urlError };
};

export const RecipeImporter = ({ url }: { url?: string }) => {
	const { user } = clientDb.useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = useState<'view' | 'edit'>('view');

	const { html: recipeHtml, urlError } = useFetchHtml(url);

	const handleChange = (url: string) => {
		navigate({ to: '/import-recipe', search: { url } });
	};

	const { recipe, error: parseError } =
		recipeHtml && url ? parseLdJsonRecipe(recipeHtml, url) : {};
	const isFetching = undefined;

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
					<Button
						disabled={!user}
						onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}
					>
						{mode === 'edit' ? 'View' : 'Edit'}
					</Button>
				</div>
			</Container>
			{isFetching && <Loading />}
			{!user && recipe && (
				<Alert variant="info" title={'Sign in to edit and save'} />
			)}
			{urlError && (
				<div className="m-3">
					<Alert
						variant="error"
						title={'Unable to fetch recipe'}
						description={urlError.issues[0].message}
					/>
				</div>
			)}
			{parseError && (
				<div className="m-3">
					<Alert
						variant="error"
						title={'Unable to parse recipe'}
						description={parseError.message}
					/>
				</div>
			)}
			{recipe && mode === 'view' && <Recipe recipe={recipe} />}
			{recipe && mode === 'edit' && <RecipeForm importedRecipe={recipe} />}
		</>
	);
};
