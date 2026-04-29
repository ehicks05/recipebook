import { createFileRoute } from "@tanstack/react-router";
import { Recipe } from "@/components/Recipe/Recipe";

export const Route = createFileRoute("/edit-recipe/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	return <Recipe id={id} />;
}
