import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeForm } from '@/features/RecipeForm';

export const Route = createFileRoute('/create-recipe')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PageLayout>
			<RecipeForm />
		</PageLayout>
	);
}
