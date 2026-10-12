import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ArrowDown, ArrowUp, Plus, Trash } from 'lucide-react';
import type {
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
} from 'react-hook-form';
import { MyInput, MySelect } from '@/components/core';
import { Button } from '@/components/ui/button';
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

	const handleAppend = () => ingredientsFieldArray.append(DEFAULT_INGREDIENT);

	return (
		<div className="flex flex-col gap-2 w-full">
			<span className="text-lg font-semibold">Ingredients</span>
			<div className="flex flex-col gap-1" ref={parent}>
				{ingredientsFieldArray.fields.map((field, index) => (
					<div key={field.id}>
						<div className="flex gap-1">
							<MyInput
								name={`ingredients.${index}.quantity`}
								placeholder="Amt"
								register={register}
								fullWidth={false}
								className="text-right"
								containerClassName="w-36"
								error={!!errors.ingredients?.[index]?.quantity}
							/>
							<MySelect
								name={`ingredients.${index}.unit`}
								register={register}
								error={!!errors.ingredients?.[index]?.unit}
							>
								<UnitOptions />
							</MySelect>
							<MyInput
								name={`ingredients.${index}.name`}
								placeholder="Ingredient"
								register={register}
								error={!!errors.ingredients?.[index]?.name}
							/>
							<div className="flex gap-1">
								<Button
									disabled={index === 0}
									onClick={() => ingredientsFieldArray.swap(index, index - 1)}
									variant="secondary"
								>
									<ArrowUp />
								</Button>
								<Button
									disabled={index === ingredientsFieldArray.fields.length - 1}
									onClick={() => ingredientsFieldArray.swap(index, index + 1)}
									variant="secondary"
								>
									<ArrowDown />
								</Button>
								<Button
									disabled={ingredientsFieldArray.fields.length <= 1}
									onClick={() => ingredientsFieldArray.remove(index)}
									variant="destructive"
								>
									<Trash />
								</Button>
							</div>
						</div>
						{[
							errors.ingredients?.[index]?.quantity?.message,
							errors.ingredients?.[index]?.unit?.message,
							errors.ingredients?.[index]?.name?.message,
						]
							.filter(Boolean)
							.map(String)
							.map((message) => (
								<div key={message} className="text-sm text-red-600">
									{message}
								</div>
							))}
					</div>
				))}
				<div className="text-right">
					<Button onClick={handleAppend} variant="secondary">
						<Plus />
					</Button>
				</div>
			</div>
		</div>
	);
};
