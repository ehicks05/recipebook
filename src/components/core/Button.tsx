/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const VARIANTS = {
	default: clsx('bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200'),
	primary: clsx(
		'bg-green-500 dark:bg-green-700 text-neutral-100 dark:text-neutral-200',
	),
	error: clsx('text-white bg-red-600 dark:bg-red-800'),
} as const;

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof VARIANTS;
	loading?: boolean;
	children?: React.ReactNode;
	isStatic?: boolean;
}

const Button = ({
	variant = 'default',
	loading,
	className = '',
	children,
	type = 'button',
	disabled,
	isStatic,
	...props
}: Props) => {
	const variantClasses = VARIANTS[variant];
	const conditionalClasses = {
		'hover:border-neutral-300 dark:hover:border-neutral-500 shadow':
			!disabled && !isStatic,
	};

	return (
		<button
			type={type}
			disabled={disabled || isStatic || loading}
			className={clsx(
				'rounded border border-transparent',
				conditionalClasses,
				variantClasses,
				className,
			)}
			{...props}
		>
			<div className="relative">
				{loading && (
					<div className="absolute inset-0 rounded bg-neutral-300 opacity-30 dark:bg-black" />
				)}
				<div
					className={clsx(
						'flex items-center justify-center gap-2 px-3 py-3 leading-none',
						{
							'opacity-50': disabled || loading,
						},
					)}
				>
					{children}
				</div>
				{loading && (
					<div className="absolute inset-0 flex h-full w-full items-center justify-center">
						<FaSpinner size={20} className="animate-spin text-neutral-500" />
					</div>
				)}
			</div>
		</button>
	);
};

export default Button;
