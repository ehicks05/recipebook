import React from 'react';
import { CgSpinner } from 'react-icons/cg';

interface IProps {
	className?: string;
}

const Loading = ({ className = '' }: IProps) => (
	<div>
		<CgSpinner
			className={`mx-auto animate-spin text-8xl text-stone-700 ${className}`}
		/>
	</div>
);

export default Loading;
