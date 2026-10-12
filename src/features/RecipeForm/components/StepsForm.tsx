import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ArrowDown, ArrowUp, Plus, Trash } from 'lucide-react';
import type {
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
} from 'react-hook-form';
import { MyInput, MyTextArea } from '@/components/core';
import { Button } from '@/components/ui/button';
import { DEFAULT_STEP } from '../constants';
import type { FormRecipe } from '../types';

interface Props {
	stepsFieldArray: UseFieldArrayReturn<FormRecipe, 'steps', 'id'>;
	register: UseFormRegister<FormRecipe>;
	errors: FieldErrors<FormRecipe>;
}

export const StepsForm = ({ stepsFieldArray, register, errors }: Props) => {
	const [parent] = useAutoAnimate();

	const handleAppend = () => stepsFieldArray.append(DEFAULT_STEP);

	return (
		<div className="flex flex-col gap-2 w-full xl:max-w-lg">
			<span className="text-lg font-semibold">Steps</span>
			<div className="flex flex-col gap-1" ref={parent}>
				{stepsFieldArray.fields.map((field, index) => (
					<div key={field.id} className="flex items-start gap-2">
						<span className="text-right">{index + 1}.</span>
						<MyInput type="hidden" name={`steps.${index}.index`} />
						<MyTextArea
							name={`steps.${index}.text`}
							placeholder="Step"
							register={register}
							error={errors.steps?.[index]?.text}
							minRows={4.1}
						/>
						<div className="flex flex-col gap-1">
							<Button
								disabled={stepsFieldArray.fields.length <= 1}
								onClick={() => stepsFieldArray.remove(index)}
								variant="destructive"
							>
								<Trash />
							</Button>
							<Button
								disabled={index === 0}
								onClick={() => stepsFieldArray.swap(index, index - 1)}
								variant="secondary"
							>
								<ArrowUp />
							</Button>
							<Button
								disabled={index === stepsFieldArray.fields.length - 1}
								onClick={() => stepsFieldArray.swap(index, index + 1)}
								variant="secondary"
							>
								<ArrowDown />
							</Button>
						</div>
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
