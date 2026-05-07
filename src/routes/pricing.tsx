import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Pricing } from '@/features/Pricing/Pricing';

export const Route = createFileRoute('/pricing')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PageLayout>
			<Pricing />
		</PageLayout>
	);
}
