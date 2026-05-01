'use client';

import { Link } from '@tanstack/react-router';
import { clientDb } from '@/lib/db';

interface Props {
	recipeId: string;
	recipeAuthorId: string;
}

export const EditLink = ({ recipeId, recipeAuthorId }: Props) => {
	const { id: userId } = clientDb.useUser();

	if (userId !== recipeAuthorId) return null;

	return (
		<div className="flex flex-wrap gap-2">
			<Link
				to="/edit-recipe/$id"
				params={{ id: recipeId }}
				title="Edit Recipe"
				preload={false}
				className="underline"
			>
				Edit
			</Link>
		</div>
	);
};
