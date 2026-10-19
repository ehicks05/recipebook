import { zodResolver } from '@hookform/resolvers/zod';
import { ClientOnly, useNavigate, useRouter } from '@tanstack/react-router';
import { CircleAlert, RotateCcw } from 'lucide-react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Container, Hero } from '@/components/core';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	createRecipe,
	type Recipe,
	updateRecipe,
} from '@/functions/recipes.functions';
import { CopyToClipboardButton } from './CopyToClipboardButton';
import { IngredientsForm, RecipeDetailsForm, StepsForm } from './components';
import { DEFAULT_RECIPE } from './constants';
import { DeleteRecipeDialog } from './DeleteRecipeDialog';
import { LeavePageConfirmationDialog } from './LeavePageConfirmationDialog';
import { PublishButton } from './PublishButton';
import { RecipeSchema } from './schema';
import type { FormRecipe } from './types';

interface Props {
	recipe?: Recipe;
	importedRecipe?: Recipe;
}

export const RecipeForm = ({ recipe, importedRecipe }: Props) => {
	const navigate = useNavigate();
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
		setValues,
	} = useForm({
		defaultValues: recipe || importedRecipe || DEFAULT_RECIPE,
		mode: 'onBlur',
		resolver: zodResolver(RecipeSchema),
	});
	const router = useRouter();
	const ingredientsFieldArray = useFieldArray({ control, name: 'ingredients' });
	const stepsFieldArray = useFieldArray({ control, name: 'steps' });

	const handleCreate = async (recipe: FormRecipe) => {
		const { id } = await createRecipe({ data: { recipe } });
		await router.invalidate();
		navigate({ to: '/recipes/$id', params: { id } });
		toast.success('Recipe created!');
	};

	const handleUpdate = async (data: FormRecipe) => {
		if (!recipe) return;

		await updateRecipe({ data: { recipe: { id: recipe.id, ...data } } });
		await router.invalidate();

		reset(data, {});
		toast.success('Recipe updated!');
	};

	const onSubmit: SubmitHandler<FormRecipe> = (data, e) => {
		e?.preventDefault();
		recipe ? handleUpdate(data) : handleCreate(data);
	};

	const onError: SubmitErrorHandler<FormRecipe> = (errors, e) => {
		e?.preventDefault();
		console.log({ errors });
	};

	const handleReset = () => reset();
	const handleView = () =>
		recipe ? navigate({ to: '/recipes/$id', params: { id: recipe.id } }) : undefined;

	const isLoading = isSubmitting;
	const error = undefined;

	return (
		<ClientOnly>
			<LeavePageConfirmationDialog shouldBlock={isDirty} />
			<Hero title={`${recipe ? 'Edit' : 'Create'} Recipe`} />
			{error && (
				<div className="m-3">
					<Alert variant="destructive">
						<CircleAlert />
						<AlertTitle>{`Unable to ${recipe ? 'update' : 'create'} recipe`}</AlertTitle>
						<div>{'error?.message'}</div>
					</Alert>
				</div>
			)}
			<Container>
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-4"
				>
					<div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
						<Button
							type="submit"
							// don't disable when invalid (clicking this will trigger error messages to show)
							disabled={isLoading || (recipe && !isDirty)}
						>
							{`${recipe ? 'Save' : 'Create Recipe '}`}
						</Button>
						{import.meta.env.DEV && !recipe && (
							<Button
								onClick={() => {
									setValues({
										name: 'foo',
										description: 'foo',
										cookingTime: '5M',
										servings: 4,
										emoji: '🧪',
										ingredients: [{ quantity: '1', unit: 'tsp', name: 'foo' }],
										steps: [{ text: 'foo' }],
									});
								}}
							>
								Seed
							</Button>
						)}
						{recipe && (
							<>
								<Button
									disabled={!isDirty}
									onClick={handleReset}
									variant="secondary"
								>
									Reset
									<RotateCcw />
								</Button>
								<Button
									disabled={isLoading}
									onClick={handleView}
									variant="secondary"
								>
									View
								</Button>
								<PublishButton recipe={recipe} />
								<CopyToClipboardButton recipe={recipe} />
								<DeleteRecipeDialog id={recipe.id} name={recipe.name} />
							</>
						)}
					</div>

					<div className="flex gap-4 flex-col xl:flex-row">
						<div className="flex flex-col gap-4 w-full lg:flex-row">
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
						</div>
						<StepsForm
							stepsFieldArray={stepsFieldArray}
							register={register}
							errors={errors}
						/>
					</div>
				</form>
			</Container>
		</ClientOnly>
	);
};
