import { Pizza } from 'lucide-react';

interface Props {
	image?: { url: string } | null;
	emoji?: string;
	className?: string;
}

export const RecipeImage = ({ image, emoji, className }: Props) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			{image && (
				<img
					className={`object-cover w-full ${className}`}
					src={image.url}
					alt="recipeImage"
					height={300}
					width={400}
				/>
			)}
			{!image && emoji && <span className="text-8xl">{emoji}</span>}
			{!image && !emoji && <Pizza className="w-3/4 h-3/4 opacity-25" />}
		</div>
	);
};
