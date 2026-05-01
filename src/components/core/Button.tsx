import clsx from 'clsx';
import type React from 'react';
import { cn } from '@/lib/utils';

const VARIANTS = {
	default: clsx('bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200'),
	primary: clsx(
		'bg-green-500 dark:bg-green-700 text-neutral-100 dark:text-neutral-200',
	),
	error: clsx('text-white bg-red-600 dark:bg-red-800'),
} as const;

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof VARIANTS;
	children?: React.ReactNode;
	isStatic?: boolean;
}

export const Button = ({
	variant = 'default',
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
			disabled={disabled || isStatic}
			className={cn(
				'flex items-center justify-center gap-2 p-2 leading-none rounded border border-transparent',
				{ 'opacity-50': disabled },
				conditionalClasses,
				variantClasses,
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
