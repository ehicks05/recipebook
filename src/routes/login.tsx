import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from '@/components/LoginForm';
import { clientDb } from '@/lib/db';

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	ssr: false,
	loader: async () => {
		const auth = await clientDb.getAuth();
		if (auth) {
			throw redirect({ to: '/' });
		}
	},
});

function RouteComponent() {
	return <LoginForm />;
}
