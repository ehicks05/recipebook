import { createFileRoute } from "@tanstack/react-router";
import { RecipeBrowser } from "@/features/RecipeBrowser/RecipeBrowser";

export const Route = createFileRoute("/recipes/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RecipeBrowser />;
}
