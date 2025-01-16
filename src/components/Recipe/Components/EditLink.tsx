'use client';

import { useUser } from '@clerk/nextjs';
import { Button } from 'components/core';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

interface Props {
	recipeId: string;
	recipeAuthorId: string;
}

export const EditLink = ({ recipeId, recipeAuthorId }: Props) => {
	const { user } = useUser();

	if (user?.id !== recipeAuthorId) return null;

	return (
		<div className="flex flex-wrap gap-2">
			<Link href={`/edit-recipe/${recipeId}`} title="Edit Recipe">
				<Button className="text-sm font-semibold">
					<HiPencilAlt className="text-2xl" />
					Edit
				</Button>
			</Link>
		</div>
	);
};
