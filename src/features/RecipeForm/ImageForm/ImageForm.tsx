import { Image } from 'lucide-react';
import { Card } from '@/components/core';
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
			{!recipe.image && (
				<Card className="flex flex-col gap-4 items-center">
					<Image size={32} />
					{recipe.id
						? 'Click below to upload an image'
						: 'Save recipe before adding an image'}
					{recipe.id && <FileUploader recipeId={recipe.id} />}
				</Card>
			)}
		</div>
	);
};
