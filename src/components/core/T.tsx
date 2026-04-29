import type { ReactNode } from 'react';

interface IProps {
	className?: string;
	children?: ReactNode | ReactNode[];
}

export const T = ({ children, className = '' }: IProps) => {
	return <span className={`${className}`}>{children}</span>;
};
