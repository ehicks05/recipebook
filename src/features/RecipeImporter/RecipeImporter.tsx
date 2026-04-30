'use client';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';
import { Alert, Button, Container, MyInput } from '@/components/core';
import { Recipe } from '@/components/Recipe/Recipe';
import { RecipeForm } from '@/components/RecipeForm';
import { parseLdJsonRecipe } from '@/features/RecipeImporter/server';
import { clientDb } from '@/lib/db';
import { Instructions } from './Instructions';
import { useFetchHtml } from './useFetchHtml';

const urlSchema = z.url({ protocol: /^https?$/ });

export const RecipeImporter = ({ url }: { url?: string }) => {
	const { user } = clientDb.useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = useState<'view' | 'edit'>('view');

	const { data: validatedUrl, error: urlError } = urlSchema.safeParse(url);
	const { html: recipeHtml } = useFetchHtml(validatedUrl);

	const handleChange = (url: string) => {
		navigate({ to: '/import-recipe', search: { url } });
	};

	const { recipe, error: parseError } =
		recipeHtml && validatedUrl ? parseLdJsonRecipe(recipeHtml, validatedUrl) : {};

	return (
		<>
			{!url && <Instructions />}
			<div className="py-2 bg-muted">
				<Container>
					<div className="flex items-start gap-1">
						<MyInput
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
			</div>
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
