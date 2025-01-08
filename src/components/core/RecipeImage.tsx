import { defaultImage, emojiToImage } from 'components/Home/constants';
import { UPLOADTHING_BASE_URL } from 'constants/uploadthing';
import Image from 'next/image';
import { FaPizzaSlice } from 'react-icons/fa';

interface Props {
	imageSrc?: string | null;
	emoji?: string;
	height?: number;
	width?: number;
	className?: string;
	onClick?: () => void;
}

const RecipeImage = ({
	imageSrc,
	emoji,
	height = 300,
	width = 400,
	className,
	onClick,
}: Props) => {
	return (
		<>
			{imageSrc && (
				<Image
					className={`object-cover w-full ${className}`}
					src={`${UPLOADTHING_BASE_URL}/${imageSrc}`}
					alt="recipe"
					height={height}
					width={width}
					onClick={onClick}
				/>
			)}
			{!imageSrc && (
				<div className="flex w-full h-full items-center justify-center">
					<FaPizzaSlice className="w-1/2 h-1/2 opacity-25" />
				</div>
			)}
		</>
	);
};

export default RecipeImage;
