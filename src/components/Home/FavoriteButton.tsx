import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { Button } from "@/components/core";
import { clientDb } from "@/lib/db";
import { toast } from "@/lib/toast";
import { toggleFavorite } from "./actions";

interface Props {
	recipeId: string;
	className?: string;
	isUserFavorite: boolean;
}

const FavoriteButton = ({ recipeId, className, isUserFavorite }: Props) => {
	const { id: userId } = clientDb.useUser();

	const Icon = isUserFavorite ? HiHeart : HiOutlineHeart;

	const handleClick = async () => {
		const { title, err } = await toggleFavorite({ recipeId });

		toast({
			variant: err ? "error" : "success",
			title,
			description: err?.message,
		});
	};

	return (
		<Button
			className={className}
			onClick={async (e) => {
				e.preventDefault();
				await handleClick();
			}}
		>
			<Icon className="text-xl text-red-500" />
		</Button>
	);
};

export default FavoriteButton;
