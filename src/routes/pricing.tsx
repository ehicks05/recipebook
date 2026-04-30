import { createFileRoute } from '@tanstack/react-router';
import { Pricing } from '@/features/Pricing/Pricing';

export const Route = createFileRoute('/pricing')({
	component: RouteComponent,
});

function RouteComponent() {
	return <Pricing />;
}
