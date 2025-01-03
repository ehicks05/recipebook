import { defaultImage, emojiToImage } from 'components/Home/constants';
import { UPLOADTHING_BASE_URL } from 'constants/uploadthing';
import Image from 'next/image';

interface Props {
	imageSrc?: string | null;
	emoji?: string;
	height?: number;
	width?: number;
	className?: string;
}

const RecipeImage = ({
	imageSrc,
	emoji,
	height = 300,
	width = 400,
	className,
}: Props) => {
	return (
		<>
			{imageSrc && (
				<Image
					className={className}
					src={`${UPLOADTHING_BASE_URL}/${imageSrc}`}
					alt="recipe"
					height={height}
					width={width}
				/>
			)}
			{!imageSrc && (
				<img
					className={className}
					src={emojiToImage[emoji || ''] || defaultImage}
					alt="recipe"
					height={height}
					width={width}
				/>
			)}
		</>
	);
};

export default RecipeImage;
