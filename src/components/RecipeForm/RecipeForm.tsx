'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { stripRecipe, updateClipboard } from 'components/Recipe/utils';
import { Alert, Button, Container, Dialog, Hero, T } from 'components/core';
import { toast } from 'react-hot-toast';
import { FaBug } from 'react-icons/fa';
import { HiClipboardCopy, HiRewind, HiTrash } from 'react-icons/hi';
import type { CompleteRecipe } from 'server/db-api';

import { api } from 'utils/api';
import { DirectionsForm, IngredientsForm } from './components';
import RecipeDetailsForm from './components/RecipeDetailsForm';
import type { FormRecipe } from './constants';
import { DEFAULT_RECIPE, RECIPE_SCHEMA } from './constants';

interface Props {
	recipe?: CompleteRecipe;
	importedRecipe?: CompleteRecipe;
}

const RecipeForm = ({ recipe, importedRecipe }: Props) => {
	const router = useRouter();
	const {
		control,
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isSubmitting, isValid, isDirty },
	} = useForm({
		defaultValues: recipe || importedRecipe || DEFAULT_RECIPE,
		mode: 'onBlur',
		resolver: zodResolver(RECIPE_SCHEMA),
	});
	const ingredientsFieldArray = useFieldArray({ control, name: 'ingredients' });
	const directionsFieldArray = useFieldArray({ control, name: 'directions' });

	const utils = api.useContext();
	const {
		mutate: createRecipe,
		isLoading: isCreateRecipeLoading,
		error: createRecipeError,
	} = api.example.createRecipe.useMutation({
		onSuccess: async (data) => {
			console.log({ data });
			await utils.example.findRecipes.invalidate();
			await router.push(`/recipe/${data.id}`);
			toast.custom((t) => (
				<Alert
					variant="success"
					title={'Recipe created!'}
					className={t.visible ? 'animate-enter' : 'animate-leave'}
				/>
			));
		},
	});

	const {
		mutate: updateRecipe,
		isLoading: isUpdateRecipeLoading,
		error: updateRecipeError,
	} = api.example.updateRecipe.useMutation({
		onSuccess: async (data) => {
			console.log({ data });
			await utils.example.findRecipe.invalidate();
			reset(data, {});

			toast.custom((t) => (
				<Alert
					variant="success"
					title={'Recipe updated!'}
					className={t.visible ? 'animate-enter' : 'animate-leave'}
				/>
			));
		},
	});

	const {
		mutate: updatePublished,
		isLoading: isUpdatePublishedLoading,
		error: updatePublishedError,
	} = api.example.updatePublished.useMutation({
		onSuccess: async (data) => {
			console.log({ data });
			await utils.example.findRecipe.invalidate();

			toast.custom((t) => (
				<Alert
					variant="success"
					title={`Recipe ${data.isPublished ? 'published' : 'unpublished'}!`}
					className={t.visible ? 'animate-enter' : 'animate-leave'}
				/>
			));
		},
	});

	const {
		mutate: deleteRecipe,
		isLoading: isDeleteRecipeLoading,
		error: deleteRecipeError,
	} = api.example.deleteRecipe.useMutation({
		onSuccess: async (data) => {
			console.log({ data });
			await utils.example.findRecipes.invalidate();
			await router.push('/');
			toast.custom((t) => (
				<Alert
					variant="success"
					title={'Recipe deleted!'}
					className={t.visible ? 'animate-enter' : 'animate-leave'}
				/>
			));
		},
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isShowDebug, setIsShowDebug] = useState(false);

	useEffect(() => {
		let id = '';
		if (recipe && isDirty) {
			id = toast.custom(
				(t) => (
					<Alert
						variant="info"
						title={'Unsaved changes'}
						className={`opacity-75 ${t.visible ? 'animate-enter' : 'animate-leave'}`}
					/>
				),
				{ duration: Number.POSITIVE_INFINITY, id: 'unsaved_changes' },
			);
		}
		if ((!recipe || !isDirty) && id) {
			toast.dismiss(id);
		}

		return () => toast.dismiss(id);
	}, [recipe, isDirty]);

	const onSubmit: SubmitHandler<FormRecipe> = (data, e) => {
		e?.preventDefault();
		console.log({ data });
		recipe ? updateRecipe({ ...data, id: recipe.id }) : createRecipe(data);
	};

	const onError: SubmitErrorHandler<FormRecipe> = (errors, e) => {
		e?.preventDefault();
		console.log({ errors });
	};

	const isLoading =
		isSubmitting ||
		isCreateRecipeLoading ||
		isUpdateRecipeLoading ||
		isUpdatePublishedLoading ||
		isDeleteRecipeLoading;

	const error = createRecipeError || updateRecipeError || updatePublishedError;

	return (
		<>
			<Hero title={`${recipe ? 'Edit' : 'Create'} Recipe`} />
			{error && (
				<div className="m-3">
					<Alert
						variant="error"
						title={`Unable to ${recipe ? 'update' : 'create'} recipe`}
						description={error.message}
					/>
				</div>
			)}
			<Container>
				{/* https://github.com/react-hook-form/react-hook-form/discussions/8020 */}
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
						<RecipeDetailsForm
							control={control}
							register={register}
							errors={errors}
						/>
						<IngredientsForm
							ingredientsFieldArray={ingredientsFieldArray}
							register={register}
							errors={errors}
						/>
						<DirectionsForm
							directionsFieldArray={directionsFieldArray}
							register={register}
							errors={errors}
						/>
					</div>
					<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button
							type="submit"
							variant="primary"
							loading={isLoading}
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
										toast.custom((t) => (
											<Alert
												variant="neutral"
												title={'Reset!'}
												className={t.visible ? 'animate-enter' : 'animate-leave'}
											/>
										));
									}}
								>
									Reset
									<HiRewind />
								</Button>
								<Button
									onClick={() => void router.push(`/recipe/${recipe.id}`)}
									loading={isLoading}
									disabled={isLoading}
								>
									View
								</Button>
								<Button
									onClick={() =>
										updatePublished({
											id: recipe.id,
											isPublished: !recipe.isPublished,
										})
									}
									loading={isLoading}
									disabled={isLoading}
								>
									{recipe.isPublished ? 'Unpublish' : 'Publish'}
								</Button>
								<Button
									onClick={() => setIsOpen(true)}
									variant="error"
									loading={isLoading}
									disabled={isLoading}
								>
									Delete
									<HiTrash />
								</Button>
							</>
						)}
					</div>
					{recipe && (
						<div className="mt-8 flex flex-col items-center justify-center gap-4">
							<T className="text-lg font-semibold">Advanced</T>
							<div className="flex gap-2">
								<Button
									onClick={() => {
										updateClipboard(JSON.stringify(stripRecipe(recipe), null, 2));
										toast.custom((t) => (
											<Alert
												variant="neutral"
												title={'Copied!'}
												className={t.visible ? 'animate-enter' : 'animate-leave'}
											/>
										));
									}}
								>
									Export JSON
									<HiClipboardCopy title="Copy to Clipboard" />
								</Button>
								<Button onClick={() => setIsShowDebug(!isShowDebug)}>
									Debug
									<FaBug />
								</Button>
							</div>
						</div>
					)}
				</form>
			</Container>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				body={
					<>
						{deleteRecipeError && (
							<Alert
								variant="error"
								title="Unable to delete recipe"
								description={deleteRecipeError.message}
							/>
						)}
						<T>
							Are you sure you want to delete{' '}
							<span className="font-bold">{recipe?.name}</span>?
						</T>
					</>
				}
				footer={
					<Button
						onClick={() => deleteRecipe({ id: recipe?.id || '' })}
						variant="error"
						loading={isLoading}
						disabled={isLoading}
					>
						Delete
					</Button>
				}
			/>
			{isShowDebug && (
				<pre className="whitespace-pre-wrap">
					<T className="text-xs">{JSON.stringify(getValues(), null, 2)}</T>
				</pre>
			)}
		</>
	);
};

export default RecipeForm;
