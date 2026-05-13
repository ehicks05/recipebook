import { Button } from '@/components/ui/button';
import type { Recipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { FileUploader } from './FileUploader';

export const RemoveImageButton = ({ recipe }: { recipe: Recipe }) => {
	const handleRemoveImage = async () => {
		const imageId = recipe.image?.id;
		if (!imageId) {
			return;
		}
		if (confirm('are you sure you want to remove this image?')) {
			await clientDb.transact(clientDb.tx.$files[imageId].delete());
		}
	};

	return (
		<Button
			type="button"
			variant="destructive"
			className="mt-4"
			onClick={handleRemoveImage}
		>
			Remove Image
		</Button>
	);
};

export const ImageForm = ({ recipe }: { recipe: Recipe }) => {
	return (
		<div>
			Image
			{recipe.image && (
				<>
					<img src={recipe.image.url} alt="recipe" />
					<RemoveImageButton recipe={recipe} />
				</>
			)}
			{recipe.id && <FileUploader recipeId={recipe.id} />}
		</div>
	);
};
