import { Pizza } from 'lucide-react';

interface Props {
	emoji?: string;
	className?: string;
}

export const RecipeImage = ({ emoji, className }: Props) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			{emoji && <span className="text-8xl">{emoji}</span>}
			{!emoji && <Pizza className="w-3/4 h-3/4 opacity-25" />}
		</div>
	);
};
