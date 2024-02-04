import clsx from 'clsx';
import { T } from 'components/core';
import React from 'react';
import type {
	FieldError,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

const BASE =
	'text-sm sm:text-base w-full rounded border-neutral-100 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-100';

// https://github.com/react-hook-form/react-hook-form/discussions/4426#discussioncomment-623148
export interface IMyInputProps<T extends FieldValues>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	leftIcon?: JSX.Element;
	containerClassName?: string;
	fullWidth?: boolean;
	name?: string;
	register?: UseFormRegister<T>;
	error?: FieldError;
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
			className={clsx('flex w-full flex-col gap-1', containerClassName, {
				'w-full': fullWidth,
				hidden: props.type === 'hidden',
			})}
		>
			{label && (
				<label htmlFor={props.id || name}>
					<T>{label}</T>
				</label>
			)}
			<input
				disabled={disabled}
				type={props.type || 'text'}
				className={clsx(BASE, className, {
					'outline outline-red-600': error,
					'cursor-not-allowed': disabled,
				})}
				{...register?.(name as Path<T>, {
					valueAsNumber: props.type === 'number',
				})}
				{...props}
			/>
			{leftIcon && <span className="">{leftIcon}</span>}
			{error && <div className="text-sm text-red-600">{error.message}</div>}
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
}

const MyTextArea = <T extends FieldValues>({
	label,
	disabled,
	register,
	error,
	name = '',
	...props
}: IMyTextAreaProps<T>) => {
	return (
		<div className="flex w-full flex-col gap-1">
			{label && (
				<label htmlFor={props.id || name}>
					<T>{label}</T>
				</label>
			)}
			<div>
				<TextareaAutosize
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
	children: JSX.Element | JSX.Element[];
	register?: UseFormRegister<T>;
	error?: FieldError;
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
					<T>{label}</T>
				</label>
			)}
			<select
				disabled={disabled}
				{...register?.(name as Path<T>, { valueAsNumber: type === 'number' })}
				className={clsx(BASE, { 'outline outline-red-600': error })}
			>
				{props.children}
			</select>
			{error && <div className="text-sm text-red-600">{error.message}</div>}
		</div>
	);
};

export { MyInput, MyTextArea, MySelect };
