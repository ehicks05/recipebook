import { cn } from 'cn';
import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
}

export const Container = ({ children, className }: Props) => (
	<div className={cn('mx-auto w-full max-w-screen-2xl p-4', className)}>
		{children}
	</div>
);
