import { defaultImage, emojiToImage } from 'components/Home/constants';
import { FaPizzaSlice } from 'react-icons/fa';
import type { File } from '@/instant.types';

// import { UPLOADTHING_BASE_URL } from "uploadthing/constants";

interface Props {
	image?: File | null;
	emoji?: string;
	emojiSize?: string;
	height?: number;
	width?: number;
	className?: string;
	onClick?: () => void;
}

export const RecipeImage = ({
	image,
	emoji,
	emojiSize = 'text-8xl',
	height = 300,
	width = 400,
	className,
	onClick,
}: Props) => {
	return (
		<div
			className={`flex items-center justify-center ${className}`}
			onClick={onClick}
			onKeyUp={onClick}
		>
			{image && (
				<img
					className={`object-cover w-full ${className}`}
					src={image.url}
					alt="recipeImage"
					height={height}
					width={width}
				/>
			)}
			{!image && emoji && <span className={emojiSize}>{emoji}</span>}
			{!image && !emoji && <FaPizzaSlice className="w-3/4 h-3/4 opacity-25" />}
		</div>
	);
};
