import { useAutoAnimate } from '@formkit/auto-animate/react';
import type {
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
} from 'react-hook-form';
import { HiArrowDown, HiArrowUp, HiPlus, HiTrash } from 'react-icons/hi';
import { Button, MyInput, MyTextArea } from '@/components/core';
import { DEFAULT_STEP } from '../constants';
import type { FormRecipe } from '../types';

interface Props {
	stepsFieldArray: UseFieldArrayReturn<FormRecipe, 'steps', 'id'>;
	register: UseFormRegister<FormRecipe>;
	errors: FieldErrors<FormRecipe>;
}

export const StepsForm = ({ stepsFieldArray, register, errors }: Props) => {
	const [parent] = useAutoAnimate();

	return (
		<div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
			<span className="text-lg font-semibold">Steps</span>
			<div className="flex flex-col gap-6" ref={parent}>
				{stepsFieldArray.fields.map((field, index) => (
					<div key={field.id} className="flex items-start gap-2">
						<span className="pr-2">{index + 1}.</span>
						<MyInput type="hidden" name={`steps.${index}.index`} />
						<MyTextArea
							name={`steps.${index}.text`}
							placeholder="Step"
							register={register}
							error={errors.steps?.[index]?.text}
						/>
						<div className="flex flex-col gap-2">
							<Button
								disabled={stepsFieldArray.fields.length <= 1}
								onClick={(e) => {
									e.preventDefault();
									stepsFieldArray.remove(index);
								}}
							>
								<HiTrash />
							</Button>
							<Button
								disabled={index === 0}
								onClick={(e) => {
									e.preventDefault();
									stepsFieldArray.swap(index, index - 1);
								}}
							>
								<HiArrowUp />
							</Button>
							<Button
								disabled={index === stepsFieldArray.fields.length - 1}
								onClick={(e) => {
									e.preventDefault();
									stepsFieldArray.swap(index, index + 1);
								}}
							>
								<HiArrowDown />
							</Button>
						</div>
					</div>
				))}
				<div className="text-right">
					<Button
						onClick={() => {
							stepsFieldArray.append(DEFAULT_STEP);
						}}
					>
						<HiPlus />
					</Button>
				</div>
			</div>
		</div>
	);
};
