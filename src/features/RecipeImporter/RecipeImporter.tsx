import { useSession } from '@better-auth-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { AlertCircle, CircleQuestionMark } from 'lucide-react';
import { useState } from 'react';
import type z from 'zod';
import { Container } from '@/components/core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
import { RecipeForm } from '@/features/RecipeForm';
import { RecipeDetail } from '@/features/RecipeViewer/RecipeDetail';
import type { Recipe } from '@/functions/recipes.functions';
import { authClient } from '@/lib/auth-client';

export const RecipeImporter = ({
	url,
	urlError,
	recipe,
	recipeError,
}: {
	url?: string;
	urlError?: z.ZodError<string>;
	recipe?: Recipe;
	recipeError?: Error;
}) => {
	const { data: session } = useSession(authClient);

	const navigate = useNavigate();
	const [mode, setMode] = useState<'view' | 'edit'>('view');
	const toggleMode = () => setMode(mode === 'edit' ? 'view' : 'edit');

	const handleChange = (url: string) => {
		navigate({ to: '/import-recipe', search: { url } });
	};

	return (
		<>
			<div className="py-2 bg-sidebar">
				<Container>
					<Field>
						<FieldLabel>Recipe URL</FieldLabel>
					</Field>
					<InputGroup>
						<InputGroupInput
							type="url"
							value={url || ''}
							onPaste={(e) => handleChange(e.clipboardData.getData('text'))}
							readOnly
							placeholder="https://example.com"
						/>

						<InputGroupAddon align="inline-end">
							<InputGroupButton
								variant="default"
								disabled={!session || !recipe}
								onClick={toggleMode}
							>
								{mode === 'edit' ? 'View' : 'Edit'}
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
					<FieldDescription>
						Paste a recipe url here. If it includes recipe metadata, the recipe will
						appear below. Check it carefully!
					</FieldDescription>
				</Container>
			</div>
			{url && urlError && (
				<Container>
					<Alert variant="destructive">
						<AlertCircle />
						<AlertTitle>Unable to fetch recipe</AlertTitle>
						<AlertDescription>{urlError.issues[0].message}</AlertDescription>
					</Alert>
				</Container>
			)}
			{recipeError && (
				<Container>
					<Alert variant="destructive">
						<AlertCircle />
						<AlertTitle>Unable to parse recipe</AlertTitle>
						<AlertDescription>{recipeError.message}</AlertDescription>
					</Alert>{' '}
				</Container>
			)}
			{!session && recipe && (
				<Alert>
					<CircleQuestionMark />
					<AlertTitle>Sign in to save this recipe</AlertTitle>
				</Alert>
			)}

			{recipe && mode === 'view' && <RecipeDetail recipe={recipe} />}
			{recipe && mode === 'edit' && <RecipeForm importedRecipe={recipe} />}
		</>
	);
};
