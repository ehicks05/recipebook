'use client';

import { Button } from '@/components/core';
import type { Recipe } from '@/instant.types';
import { clientDb } from '@/lib/db';
import { toast } from '@/lib/toast';

const updatePublished = async ({
	id,
	publish,
}: {
	id: string;
	publish: boolean;
}) => {
	await clientDb.transact(clientDb.tx.recipes[id].update({ isPublished: publish }));
	const title = `Recipe ${publish ? 'published' : 'unpublished'}`;
	toast({ variant: 'success', title });
};

export const PublishButton = ({ recipe }: { recipe: Recipe }) => {
	return (
		<Button
			disabled={recipe.isFeatured}
			onClick={() =>
				updatePublished({ id: recipe.id, publish: !recipe.isPublished })
			}
		>
			{recipe.isPublished ? 'Unpublish' : 'Publish'}
		</Button>
	);
};
