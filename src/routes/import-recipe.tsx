import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { RecipeImporter } from '@/features/RecipeImporter/RecipeImporter';

const searchSchema = z.object({
	url: z.url().optional(),
});

export const Route = createFileRoute('/import-recipe')({
	validateSearch: (search) => searchSchema.parse(search),
	component: RouteComponent,
});

function RouteComponent() {
	const { url } = Route.useSearch();

	return <RecipeImporter url={url} />;
}
