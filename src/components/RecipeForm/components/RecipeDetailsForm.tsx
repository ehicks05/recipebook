import { MyInput, MySelect, MyTextArea, T } from 'components/core';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormRecipe } from '../types';
import EmojiInput from './EmojiInput';
import RecipeImageInput from './RecipeImageInput';

interface Props {
	errors: FieldErrors<FormRecipe>;
	register: UseFormRegister<FormRecipe>;
	control: Control<FormRecipe>;
}

const RecipeDetailsForm = ({ errors, register, control }: Props) => {
	return (
		<div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
			<T className="text-lg font-semibold">Recipe Details</T>
			<MyInput type="hidden" readOnly name="source" register={register} />
			<MyInput type="hidden" readOnly name="isPublished" register={register} />

			<MyInput
				name="name"
				label="Name"
				placeholder="Name"
				register={register}
				error={errors.name}
			/>
			<MyTextArea
				name="description"
				label="Description"
				placeholder="Add a description here"
				register={register}
				error={errors.description}
			/>

			<div className="flex gap-2">
				<MyInput
					name="cookingTime"
					label="Time"
					placeholder="Minutes"
					min="1"
					register={register}
					error={errors.cookingTime}
				/>
				<MyInput
					type="number"
					name="servings"
					label="Servings"
					placeholder="Servings"
					min="1"
					register={register}
					error={errors.servings}
				/>
				<MySelect
					label="Difficulty"
					name="difficulty"
					register={register}
					error={errors.difficulty}
					type="number"
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</MySelect>
			</div>
			<EmojiInput control={control} />
			<RecipeImageInput />
		</div>
	);
};

export default RecipeDetailsForm;
