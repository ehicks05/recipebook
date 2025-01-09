import { defaultImage, emojiToImage } from 'components/Home/constants';
import { UPLOADTHING_BASE_URL } from 'constants/uploadthing';
import Image from 'next/image';
import { FaPizzaSlice } from 'react-icons/fa';

interface Props {
	imageSrc?: string | null;
	emoji?: string;
	emojiSize?: string;
	height?: number;
	width?: number;
	className?: string;
	onClick?: () => void;
}

const RecipeImage = ({
	imageSrc,
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
			{imageSrc && (
				<Image
					className={`object-cover w-full ${className}`}
					src={`${UPLOADTHING_BASE_URL}/${imageSrc}`}
					alt="recipe"
					height={height}
					width={width}
				/>
			)}
			{!imageSrc && emoji && <span className={emojiSize}>{emoji}</span>}
			{!imageSrc && !emoji && <FaPizzaSlice className="w-3/4 h-3/4 opacity-25" />}
		</div>
	);
};

export default RecipeImage;
