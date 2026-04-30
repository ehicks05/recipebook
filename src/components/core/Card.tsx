import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
	children: ReactNode;
}

export const Card = ({ children, className = '' }: Props) => {
	return (
		<div className={cn('rounded p-4 shadow dark:bg-neutral-800', className)}>
			{children}
		</div>
	);
};
