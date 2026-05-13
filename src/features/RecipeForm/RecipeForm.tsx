'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { HiRewind } from 'react-icons/hi';
import { Alert, Button, Container, Hero } from '@/components/core';
import type { Recipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { dismissToast, toast } from '@/lib/toast';
import { CopyToClipboardButton } from './CopyToClipboardButton';
import { IngredientsForm, RecipeDetailsForm, StepsForm } from './components';
import { DEFAULT_RECIPE } from './constants';
import { DeleteRecipeDialog } from './DeleteRecipeDialog';
import { createRecipe } from './lib/createRecipe';
import { updateRecipe } from './lib/updateRecipe';
import { PublishButton } from './PublishButton';
import { RecipeSchema } from './schema';
import type { FormRecipe } from './types';

interface Props {
	recipe?: Recipe;
	importedRecipe?: Recipe;
}

export const RecipeForm = ({ recipe, importedRecipe }: Props) => {
	const { id: userId } = clientDb.useUser();
	const navigate = useNavigate();
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm({
		defaultValues: recipe || importedRecipe || DEFAULT_RECIPE,
		mode: 'onBlur',
		resolver: zodResolver(RecipeSchema),
	});
	const ingredientsFieldArray = useFieldArray({ control, name: 'ingredients' });
	const stepsFieldArray = useFieldArray({ control, name: 'steps' });

	const handleCreate = async (recipe: FormRecipe) => {
		const recipeId = await createRecipe({ recipe, userId });
		navigate({ to: '/recipes/$id', params: { id: recipeId } });
		toast({ variant: 'success', title: 'Recipe created!' });
	};

	const handleUpdate = async (data: FormRecipe) => {
		if (!recipe) return;
		await updateRecipe({ recipeId: recipe.id, recipe: data });
		reset(data, {});
		toast({ variant: 'success', title: 'Recipe updated!' });
	};

	useEffect(() => {
		let id = '';
		if (recipe && isDirty) {
			id = toast({
				variant: 'info',
				title: 'Unsaved changes',
				className: 'opacity-75',
				options: { duration: Number.POSITIVE_INFINITY, id: 'unsaved_changes' },
			});
		}
		if ((!recipe || !isDirty) && id) {
			dismissToast(id);
		}

		return () => dismissToast(id);
	}, [recipe, isDirty]);

	const onSubmit: SubmitHandler<FormRecipe> = (data, e) => {
		e?.preventDefault();
		console.log({ data });
		recipe ? handleUpdate(data) : handleCreate(data);
	};

	const onError: SubmitErrorHandler<FormRecipe> = (errors, e) => {
		e?.preventDefault();
		console.log({ errors });
	};

	const isLoading = isSubmitting;
	const error = undefined;

	return (
		<>
			<Hero title={`${recipe ? 'Edit' : 'Create'} Recipe`} />
			{error && (
				<div className="m-3">
					<Alert
						variant="error"
						title={`Unable to ${recipe ? 'update' : 'create'} recipe`}
						description={'error.message'}
					/>
				</div>
			)}
			<Container>
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col items-center gap-2 sm:flex-row">
						<Button
							type="submit"
							variant="primary"
							// don't disable when invalid (clicking this will trigger error messages to show)
							disabled={isLoading || (recipe && !isDirty)}
						>
							{`${recipe ? 'Save' : 'Create Recipe '}`}
						</Button>
						{recipe && (
							<>
								<Button
									disabled={!isDirty}
									onClick={() => {
										reset();
										toast({ variant: 'neutral', title: 'Changes reset' });
									}}
								>
									Reset
									<HiRewind />
								</Button>
								<Button
									onClick={() =>
										navigate({ to: '/recipes/$id', params: { id: recipe.id } })
									}
									disabled={isLoading}
								>
									View
								</Button>
								<PublishButton recipe={recipe} />
								<DeleteRecipeDialog id={recipe.id} name={recipe.name} />
								<CopyToClipboardButton recipe={recipe} />
							</>
						)}
					</div>

					<div className="flex gap-4 flex-wrap">
						<RecipeDetailsForm
							control={control}
							register={register}
							errors={errors}
							recipe={recipe}
						/>
						<IngredientsForm
							ingredientsFieldArray={ingredientsFieldArray}
							register={register}
							errors={errors}
						/>
						<StepsForm
							stepsFieldArray={stepsFieldArray}
							register={register}
							errors={errors}
						/>
					</div>
				</form>
			</Container>
		</>
	);
};
