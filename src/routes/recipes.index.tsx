import { createFileRoute } from "@tanstack/react-router";
import RecipePicker from "@/components/Home/RecipePicker";

export const Route = createFileRoute("/recipes/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RecipePicker />;
}
