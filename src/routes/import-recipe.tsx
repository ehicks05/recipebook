import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { parseLdJsonRecipe } from '@/features/RecipeImporter/parseLdJsonRecipe';
import { RecipeImporter } from '@/features/RecipeImporter/RecipeImporter';
import { fetchHtmlServerFn } from '@/features/RecipeImporter/useFetchHtml';

const searchSchema = z.object({
	url: z.string().optional(),
});

const urlSchema = z.url({ protocol: /^https?$/ });

export const Route = createFileRoute('/import-recipe')({
	validateSearch: searchSchema,
	loaderDeps: ({ search }) => ({
		url: search.url,
	}),
	loader: async ({ deps: { url } }) => {
		const { data: validatedUrl, error: urlError } = urlSchema.safeParse(url);
		const recipeHtml = validatedUrl
			? await fetchHtmlServerFn({ data: { url: validatedUrl } })
			: undefined;
		const { recipe, error: recipeError } =
			recipeHtml && validatedUrl ? parseLdJsonRecipe(recipeHtml, validatedUrl) : {};

		return { url, urlError, recipe, recipeError };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { url, urlError, recipe, recipeError } = Route.useLoaderData();

	return (
		<RecipeImporter
			url={url}
			urlError={urlError}
			recipe={recipe}
			recipeError={recipeError}
		/>
	);
}
