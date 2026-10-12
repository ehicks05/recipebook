import { useNavigate } from '@tanstack/react-router';
import { AlertCircle, CircleQuestionMark } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { Container } from '@/components/core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
import { RecipeForm } from '@/features/RecipeForm';
import { parseLdJsonRecipe } from '@/features/RecipeImporter/server';
import { RecipeDetail } from '@/features/RecipeViewer/RecipeDetail';
import { authClient } from '@/lib/auth-client';
import { Instructions } from './Instructions';
import { useFetchHtml } from './useFetchHtml';

const urlSchema = z.url({ protocol: /^https?$/ });

export const RecipeImporter = ({ url }: { url?: string }) => {
	const { data: session } = authClient.useSession();
	const user = session?.user;

	const navigate = useNavigate();
	const [mode, setMode] = useState<'view' | 'edit'>('view');
	const toggleMode = () => setMode(mode === 'edit' ? 'view' : 'edit');

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
			{url && urlError && (
				<Container>
					<Alert variant="destructive">
						<AlertCircle />
						<AlertTitle>Unable to fetch recipe</AlertTitle>
						<AlertDescription>{urlError.issues[0].message}</AlertDescription>
					</Alert>
				</Container>
			)}
			{parseError && (
				<Container>
					<Alert variant="destructive">
						<AlertCircle />
						<AlertTitle>Unable to parse recipe</AlertTitle>
						<AlertDescription>{parseError.message}</AlertDescription>
					</Alert>{' '}
				</Container>
			)}
			<div className="py-2">
				<Container>
					<InputGroup>
						<InputGroupInput
							placeholder="enter a recipe url"
							value={url || ''}
							onChange={(e) => handleChange(e.target.value)}
						/>

						<InputGroupAddon align="inline-end">
							<InputGroupButton
								variant="default"
								disabled={!user || !recipe}
								onClick={toggleMode}
							>
								{mode === 'edit' ? 'View' : 'Edit'}
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				</Container>
			</div>
			{!user && recipe && (
				<Alert>
					<CircleQuestionMark />
					<AlertTitle>Sign in to edit and save</AlertTitle>
				</Alert>
			)}

			{recipe && mode === 'view' && <RecipeDetail recipe={recipe} />}
			{recipe && mode === 'edit' && <RecipeForm importedRecipe={recipe} />}
		</>
	);
};
