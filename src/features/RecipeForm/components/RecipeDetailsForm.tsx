import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormRecipe } from '../types';
import { EmojiInput } from './EmojiInput';
import { MyInput, MyTextArea } from './StyledInputs';

interface Props {
	errors: FieldErrors<FormRecipe>;
	register: UseFormRegister<FormRecipe>;
	control: Control<FormRecipe>;
}

export const RecipeDetailsForm = ({ errors, register, control }: Props) => {
	return (
		<div className="flex flex-col gap-2 w-full lg:max-w-xs">
			<span className="text-lg font-semibold">Recipe Details</span>
			<MyInput type="hidden" readOnly name="isPublished" register={register} />

			<MyTextArea
				name="name"
				label="Name"
				placeholder="Name"
				register={register}
				error={errors.name}
			/>
			<MyTextArea
				name="description"
				label="Description"
				placeholder="Description"
				register={register}
				error={errors.description}
			/>
			<MyInput
				name="source"
				label="Source URL (optional)"
				placeholder="Source"
				register={register}
			/>

			<div className="flex flex-col">
				<div className="flex gap-2">
					<MyInput
						name="cookingTime"
						label="Time"
						placeholder="Minutes"
						min="1"
						register={register}
						error={!!errors.cookingTime}
					/>
					<MyInput
						type="number"
						name="servings"
						label="Servings"
						placeholder="Servings"
						min="1"
						register={register}
						error={!!errors.servings}
					/>
				</div>

				<div className="flex w-full">
					{errors?.cookingTime?.message && (
						<div className="text-sm text-red-600">
							{errors?.cookingTime?.message.toString()}
						</div>
					)}
					{errors?.cookingTime?.message && (
						<div className="ml-auto text-sm text-red-600">
							{errors?.servings?.message}
						</div>
					)}
				</div>
			</div>

			<EmojiInput control={control} />
		</div>
	);
};
