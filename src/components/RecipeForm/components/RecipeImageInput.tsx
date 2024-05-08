import { useClerk } from '@clerk/nextjs';
import Compressor from '@uppy/compressor';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHR from '@uppy/xhr-upload';
import { Button, Dialog, T } from 'components/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { api } from 'utils/api';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

const maxFileSize = 8 * 1024 * 1024;

interface MyUppyProps {
	recipeId: string;
	token: string;
}

const MyUppy = ({ recipeId, token }: MyUppyProps) => {
	const { refetch: refetchRecipe } = api.example.findRecipe.useQuery({
		id: recipeId,
	});

	const [uppy] = useState(() =>
		new Uppy({
			restrictions: {
				allowedFileTypes: ['image/*'],
				maxFileSize,
				maxNumberOfFiles: 1,
			},
		})
			.use(XHR, {
				endpoint: '/api/upload-file',
				allowedMetaFields: ['recipeId', 'contentType', 'cacheControl'],
				headers: { authorization: `Bearer ${token}` },
			})
			.use(Compressor, {
				//@ts-expect-error uppy apparently doesn't know about Compressor.js settings
				maxHeight: 1920,
				maxWidth: 1080,
			})
			.on('file-added', (file) => {
				file.meta = {
					...file.meta,
					contentType: file.type,
					recipeId,
				};
			})
			.on('upload-success', () => refetchRecipe()),
	);

	return <Dashboard uppy={uppy} showProgressDetails theme="dark" height={330} />;
};

const RecipeImageInput = () => {
	const { query } = useRouter();
	const { id } = query;
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
		isLoading: isRemoveImageLoading,
		error: removeImageError,
	} = api.example.removeImage.useMutation({ onSuccess: () => refetchRecipe() });

	return (
		<div className="flex flex-col gap-1">
			<label>
				<T>Image</T>
			</label>
			{recipe?.imageSrc ? (
				<Image
					src={recipe.imageSrc}
					alt="recipe"
					onClick={() => setIsOpen(true)}
					className="rounded-lg cursor-pointer hover:animate-pulse"
					width={300}
					height={300}
				/>
			) : (
				<Button type="button" onClick={() => setIsOpen(true)}>
					<HiQuestionMarkCircle size={32} />
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
