import clsx from 'clsx';
import type React from 'react';
import type {
	FieldError,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';

const BASE =
	'px-3 py-1 h-full text-sm sm:text-base w-full rounded border-neutral-100 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-100';

// https://github.com/react-hook-form/react-hook-form/discussions/4426#discussioncomment-623148
export interface IMyInputProps<T extends FieldValues>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	leftIcon?: React.JSX.Element;
	containerClassName?: string;
	fullWidth?: boolean;
	name?: string;
	register?: UseFormRegister<T>;
	error?: boolean;
}

/**
 * Includes the label and error ui. Works with react-hook-form.
 */
const MyInput = <T extends FieldValues>({
	name = '',
	className = '',
	label,
	leftIcon,
	containerClassName = '',
	fullWidth = true,
	disabled,
	register,
	error,
	...props
}: IMyInputProps<T>) => {
	return (
		<div
			className={cn('flex flex-col gap-1/2', containerClassName, {
				'w-full': fullWidth,
				hidden: props.type === 'hidden',
			})}
		>
			{label && (
				<label htmlFor={props.id || name}>
					<span>{label}</span>
				</label>
			)}
			<input
				disabled={disabled}
				type={props.type || 'text'}
				className={clsx(BASE, '[appearance:textfield]', className, {
					'outline outline-red-600': error,
					'cursor-not-allowed': disabled,
				})}
				{...register?.(name as Path<T>, {
					valueAsNumber: props.type === 'number',
				})}
				{...props}
			/>
			{leftIcon && <span className="">{leftIcon}</span>}
		</div>
	);
};

interface IMyTextAreaProps<T extends FieldValues> {
	id?: string;
	name?: string;
	label?: string;
	disabled?: boolean;
	placeholder: string;
	register?: UseFormRegister<T>;
  error?: FieldError;
  minRows?: number;
}

const MyTextArea = <T extends FieldValues>({
	label,
	disabled,
	register,
  error,
	minRows,
	name = '',
	...props
}: IMyTextAreaProps<T>) => {
	return (
		<div className="flex w-full flex-col gap-1">
			{label && (
				<label htmlFor={props.id || name}>
					<span>{label}</span>
				</label>
			)}
			<div>
				<TextareaAutosize
					minRows={minRows}
					disabled={disabled}
					placeholder={props.placeholder}
					className={clsx(BASE, {
						'outline outline-red-600': error,
						'cursor-not-allowed': disabled,
					})}
					rows={1}
					{...register?.(name as Path<T>)}
				/>
				{error && <div className="-mt-1 text-sm text-red-600">{error.message}</div>}
			</div>
		</div>
	);
};

interface IMySelectProps<T extends FieldValues> {
	id?: string;
	name?: string;
	label?: string;
	type?: 'number';
	disabled?: boolean;
	children: React.JSX.Element | React.JSX.Element[];
	register?: UseFormRegister<T>;
	error?: boolean;
}

const MySelect = <T extends FieldValues>({
	label,
	type,
	disabled,
	register,
	error,
	name = '',
	...props
}: IMySelectProps<T>) => {
	return (
		<div className={'flex min-w-fit flex-col gap-1'}>
			{label && (
				<label htmlFor={props.id || name}>
					<span>{label}</span>
				</label>
			)}
			<select
				disabled={disabled}
				{...register?.(name as Path<T>, { valueAsNumber: type === 'number' })}
				className={clsx(BASE, 'h-8 border-r-8', {
					'outline outline-red-600': error,
				})}
			>
				{props.children}
			</select>
		</div>
	);
};

export { MyInput, MySelect, MyTextArea };
