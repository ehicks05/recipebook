import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeForm } from '@/features/RecipeForm';

export const Route = createFileRoute('/_protected/create-recipe')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PageLayout>
			<RecipeForm />
		</PageLayout>
	);
}
