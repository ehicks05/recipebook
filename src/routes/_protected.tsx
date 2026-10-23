import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
	beforeLoad: async ({ location, context: { session } }) => {
		if (!session) {
			throw redirect({
				to: '/auth/$path',
				params: { path: 'sign-in' },
				search: { redirectTo: location.href },
			});
		}

		return { session };
	},
	component: () => <Outlet />,
});
