import { createFileRoute } from '@tanstack/react-router';
import { RecipeForm } from '@/features/RecipeForm';

export const Route = createFileRoute('/_protected/create-recipe')({
	component: RouteComponent,
});

function RouteComponent() {
	return <RecipeForm />;
}
