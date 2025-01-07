import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, MyInput, MyTextArea, T } from 'components/core';
import type {
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
} from 'react-hook-form';
import { HiArrowDown, HiArrowUp, HiPlus, HiTrash } from 'react-icons/hi';
import { DEFAULT_DIRECTION } from '../constants';
import type { FormRecipe } from '../types';

interface Props {
	directionsFieldArray: UseFieldArrayReturn<FormRecipe, 'directions', 'id'>;
	register: UseFormRegister<FormRecipe>;
	errors: FieldErrors<FormRecipe>;
}

const DirectionsForm = ({ directionsFieldArray, register, errors }: Props) => {
	const [parent] = useAutoAnimate();

	return (
		<div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
			<T className="text-lg font-semibold">Directions</T>
			<div className="flex flex-col gap-6" ref={parent}>
				{directionsFieldArray.fields.map((field, index) => (
					<div key={field.id} className="flex items-start gap-2">
						<T className="pr-2">{index + 1}.</T>
						<MyInput type="hidden" name={`directions.${index}.index`} />
						<MyTextArea
							name={`directions.${index}.text`}
							placeholder="Direction"
							register={register}
							error={errors.directions?.[index]?.text}
						/>
						<div className="flex flex-col gap-2">
							<Button
								disabled={directionsFieldArray.fields.length <= 1}
								onClick={(e) => {
									e.preventDefault();
									directionsFieldArray.remove(index);
								}}
							>
								<HiTrash />
							</Button>
							<Button
								disabled={index === 0}
								onClick={(e) => {
									e.preventDefault();
									directionsFieldArray.swap(index, index - 1);
								}}
							>
								<HiArrowUp />
							</Button>
							<Button
								disabled={index === directionsFieldArray.fields.length - 1}
								onClick={(e) => {
									e.preventDefault();
									directionsFieldArray.swap(index, index + 1);
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
							directionsFieldArray.append({
								...DEFAULT_DIRECTION,
								// index: values.directions.length,
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

export default DirectionsForm;
