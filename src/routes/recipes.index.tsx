import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeBrowser } from '@/features/RecipeBrowser/RecipeBrowser';

export const Route = createFileRoute('/recipes/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PageLayout>
			<RecipeBrowser />
		</PageLayout>
	);
}
