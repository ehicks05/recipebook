import type { ReactNode } from 'react';

interface IProps {
	className?: string;
	children?: ReactNode | ReactNode[];
}

const T = ({ children, className = '' }: IProps) => {
	return <span className={`${className}`}>{children}</span>;
};

export default T;
