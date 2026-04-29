import { defaultImage, emojiToImage } from "components/Home/constants";
// import Image from 'next/image';
import { FaPizzaSlice } from "react-icons/fa";

// import { UPLOADTHING_BASE_URL } from "uploadthing/constants";

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
	emojiSize = "text-8xl",
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
				<img
					className={`object-cover w-full ${className}`}
					src={`${"foo"}/${imageSrc}`}
					alt="recipe"
					height={height}
					width={width}
				/>
			)}
			{!imageSrc && emoji && <span className={emojiSize}>{emoji}</span>}
			{!imageSrc && !emoji && (
				<FaPizzaSlice className="w-3/4 h-3/4 opacity-25" />
			)}
		</div>
	);
};

export default RecipeImage;
