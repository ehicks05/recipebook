import { Link } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';

interface Props {
	recipeId: string;
	recipeAuthorId: string;
}

export const EditLink = ({ recipeId, recipeAuthorId }: Props) => {
	const { data: session } = authClient.useSession();
	const userId = session?.user.id;

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
