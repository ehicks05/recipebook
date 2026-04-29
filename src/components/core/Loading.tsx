import { CgSpinner } from 'react-icons/cg';

interface IProps {
	className?: string;
}

export const Loading = ({ className = '' }: IProps) => (
	<div>
		<CgSpinner
			className={`mx-auto animate-spin text-8xl text-stone-700 ${className}`}
		/>
	</div>
);
