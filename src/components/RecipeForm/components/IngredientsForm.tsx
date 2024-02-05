import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, MyInput, MySelect, T } from 'components/core';
import type {
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
} from 'react-hook-form';
import { HiArrowDown, HiArrowUp, HiPlus, HiTrash } from 'react-icons/hi';
import type { FormRecipe } from '../constants';
import { DEFAULT_INGREDIENT, UNIT_OPTIONS } from '../constants';

interface Props {
	ingredientsFieldArray: UseFieldArrayReturn<FormRecipe, 'ingredients', 'id'>;
	register: UseFormRegister<FormRecipe>;
	errors: FieldErrors<FormRecipe>;
}

const IngredientsForm = ({ ingredientsFieldArray, register, errors }: Props) => {
	const [parent] = useAutoAnimate();

	return (
		<div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
			<T className="text-lg font-semibold">Ingredients</T>
			<div className="flex flex-col gap-6" ref={parent}>
				{ingredientsFieldArray.fields.map((field, index) => (
					<div key={field.id} className="flex flex-col gap-2">
						<MyInput type="hidden" name={`ingredients.${index}.index`} />
						<div className="flex items-start gap-2">
							<MyInput
								name={`ingredients.${index}.quantity`}
								placeholder="Quantity"
								register={register}
								error={errors.ingredients?.[index]?.quantity}
							/>
							<MySelect
								name={`ingredients.${index}.unit`}
								register={register}
								error={errors.ingredients?.[index]?.unit}
							>
								{UNIT_OPTIONS}
							</MySelect>
							<div className="flex gap-2">
								<Button
									disabled={index === 0}
									onClick={(e) => {
										e.preventDefault();
										ingredientsFieldArray.swap(index, index - 1);
									}}
								>
									<HiArrowUp />
								</Button>
								<Button
									disabled={index === ingredientsFieldArray.fields.length - 1}
									onClick={(e) => {
										e.preventDefault();
										ingredientsFieldArray.swap(index, index + 1);
									}}
								>
									<HiArrowDown />
								</Button>
								<Button
									disabled={ingredientsFieldArray.fields.length <= 1}
									onClick={(e) => {
										e.preventDefault();
										ingredientsFieldArray.remove(index);
									}}
								>
									<HiTrash />
								</Button>
							</div>
						</div>
						<MyInput
							name={`ingredients.${index}.name`}
							placeholder="Ingredient"
							register={register}
							error={errors.ingredients?.[index]?.name}
						/>
					</div>
				))}
				<div className="text-right">
					<Button
						onClick={() => {
							ingredientsFieldArray.append({
								...DEFAULT_INGREDIENT,
								// index: values.ingredients.length,
							});
						}}
					>
						<HiPlus />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default IngredientsForm;
