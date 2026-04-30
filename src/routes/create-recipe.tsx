import { createFileRoute } from '@tanstack/react-router';
import { RecipeForm } from '@/features/RecipeForm';

export const Route = createFileRoute('/create-recipe')({
	component: RouteComponent,
});

function RouteComponent() {
	return <RecipeForm />;
}
