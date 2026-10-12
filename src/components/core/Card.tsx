import { cn } from 'cn';
import type { ReactNode } from 'react';

interface Props {
	className?: string;
	children: ReactNode;
}

export const Card = ({ children, className = '' }: Props) => {
	return (
		<div className={cn('rounded p-4 shadow', className)}>{children}</div>
	);
};
