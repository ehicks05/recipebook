import { useAutoAnimate } from '@formkit/auto-animate/react';
import type {
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
} from 'react-hook-form';
import { HiArrowDown, HiArrowUp, HiPlus, HiTrash } from 'react-icons/hi';
import { Button, MyInput, MySelect } from '@/components/core';
import { DEFAULT_INGREDIENT, UNITS } from '../constants';
import type { FormRecipe } from '../types';

const UnitOptions = () =>
	['', ...UNITS].map((unit) => (
		<option key={unit} value={unit}>
			{unit}
		</option>
	));

interface Props {
	ingredientsFieldArray: UseFieldArrayReturn<FormRecipe, 'ingredients', 'id'>;
	register: UseFormRegister<FormRecipe>;
	errors: FieldErrors<FormRecipe>;
}

export const IngredientsForm = ({
	ingredientsFieldArray,
	register,
	errors,
}: Props) => {
	const [parent] = useAutoAnimate();

	return (
		<div className="flex flex-col gap-2 max-w-2xl">
			<span className="text-lg font-semibold">Ingredients</span>
			<div className="flex flex-col gap-1" ref={parent}>
				{ingredientsFieldArray.fields.map((field, index) => (
					<div key={field.id} className="flex gap-1">
						<MyInput
              name={`ingredients.${index}.quantity`}
              placeholder="Quantity"
							register={register}
              error={errors.ingredients?.[index]?.quantity}
              fullWidth={false}
              className='text-right'
              containerClassName='w-36'
						/>
						<MySelect
							name={`ingredients.${index}.unit`}
							register={register}
							error={errors.ingredients?.[index]?.unit}
						>
							<UnitOptions />
						</MySelect>
						<MyInput
              name={`ingredients.${index}.name`}
							placeholder="Ingredient"
							register={register}
							error={errors.ingredients?.[index]?.name}
						/>
						<div className="flex gap-1">
							<Button
								disabled={index === 0}
								onClick={() => ingredientsFieldArray.swap(index, index - 1)}
							>
								<HiArrowUp />
							</Button>
							<Button
								disabled={index === ingredientsFieldArray.fields.length - 1}
								onClick={() => ingredientsFieldArray.swap(index, index + 1)}
							>
								<HiArrowDown />
							</Button>
							<Button
								disabled={ingredientsFieldArray.fields.length <= 1}
								onClick={() => ingredientsFieldArray.remove(index)}
							>
								<HiTrash />
							</Button>
						</div>
					</div>
				))}
				<div className="text-right">
					<Button onClick={() => ingredientsFieldArray.append(DEFAULT_INGREDIENT)}>
						<HiPlus />
					</Button>
				</div>
			</div>
		</div>
	);
};
