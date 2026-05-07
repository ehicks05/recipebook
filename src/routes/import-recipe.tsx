import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeImporter } from '@/features/RecipeImporter/RecipeImporter';

const searchSchema = z.object({
	url: z.string().optional(),
});

export const Route = createFileRoute('/import-recipe')({
	validateSearch: (search) => {
		const { data } = searchSchema.safeParse(search);
		return { url: data?.url };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { url } = Route.useSearch();

	return (
		<PageLayout>
			<RecipeImporter url={url} />
		</PageLayout>
	);
}
