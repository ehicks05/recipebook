'use client';

import { useClerk } from '@clerk/nextjs';
import { Button, Dialog, RecipeImage, T } from 'components/core';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from 'trpc/react';
import { UploadButton } from '../../../utils/uploadthing';

interface MyUppyProps {
	recipeId: string;
	token: string;
}

const MyUppy = ({ recipeId, token }: MyUppyProps) => {
	const { refetch: refetchRecipe } = api.example.findRecipe.useQuery({
		id: recipeId,
	});

	return (
		<UploadButton
			endpoint="imageUploader"
			headers={{ authorization: `Bearer ${token}`, recipeId }}
			onBeforeUploadBegin={(files) => {
				// Preprocess files before uploading (e.g. rename them)
				return files.map((f) => new File([f], recipeId, { type: f.type }));
			}}
			onClientUploadComplete={(res) => {
				// Do something with the response
				console.log('Files: ', res);
				refetchRecipe();
			}}
			onUploadError={(error: Error) => {
				// Do something with the error.
				alert(`ERROR! ${error.message}`);
			}}
		/>
	);
};

const RecipeImageInput = () => {
	const params = useParams<{ id: string }>();
	const id = params?.id;
	const recipeId = id && typeof id === 'string' ? id : '';

	const [isOpen, setIsOpen] = useState(false);
	const { session } = useClerk();
	const [token, setToken] = useState('');

	useEffect(() => {
		const set = async () => {
			const token = (await session?.getToken()) || '';
			setToken(token);
		};
		set();
	}, [session]);

	const { data: recipe, refetch: refetchRecipe } = api.example.findRecipe.useQuery({
		id: recipeId,
	});
	const {
		mutate: removeImage,
		isPending: isRemoveImageLoading,
		error: removeImageError,
	} = api.example.removeImage.useMutation({ onSuccess: () => refetchRecipe() });

	return (
		<div className="flex flex-col gap-1">
			<span>
				<T>Image</T>
			</span>
			{recipe?.imageSrc ? (
				<RecipeImage
					imageSrc={recipe.imageSrc}
					onClick={() => setIsOpen(true)}
					className="rounded-lg cursor-pointer"
					width={300}
					height={300}
				/>
			) : (
				<Button type="button" onClick={() => setIsOpen(true)}>
					<div className="h-48">
						<RecipeImage
							imageSrc={undefined}
							onClick={() => setIsOpen(true)}
							className="w-full h-full"
						/>
					</div>
				</Button>
			)}
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				body={
					<div className="mx-auto w-min">
						<T className="text-lg font-semibold">Recipe Image</T>
						{token && <MyUppy recipeId={recipeId} token={token} />}
					</div>
				}
				footer={
					recipe?.imageSrc && (
						<div>
							<Button
								type="button"
								variant="error"
								loading={isRemoveImageLoading}
								onClick={() => removeImage({ id: recipeId })}
							>
								Remove Image
							</Button>
						</div>
					)
				}
			/>
		</div>
	);
};

export default RecipeImageInput;
