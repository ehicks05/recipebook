'use client';

import { Button } from '@/components/core';
import type { Recipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { toast } from '@/lib/toast';

export const PublishButton = ({ recipe }: { recipe: Recipe }) => {
	const updatePublished = async ({
		id,
		isPublished,
	}: {
		id: string;
		isPublished: boolean;
	}) => {
		await clientDb.transact(clientDb.tx.recipes[id].update({ isPublished }));
		const title = `Recipe ${isPublished ? 'published' : 'unpublished'}`;
		toast({ variant: 'success', title });
	};

	return (
		<Button
			onClick={() =>
				updatePublished({
					id: recipe.id,
					isPublished: !recipe.isPublished,
				})
			}
			// loading={isLoading}
			// disabled={isLoading}
		>
			{recipe.isPublished ? 'Unpublish' : 'Publish'}
		</Button>
	);
};
