import {
	createFileRoute,
	Outlet,
	redirect,
	useRouteContext,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
	beforeLoad: async ({ location }) => {
		const { session } = useRouteContext({ from: '__root__' });

		if (!session) {
			throw redirect({
				to: '/auth/$path',
				params: { path: 'sign-in' },
				search: { redirectTo: location.href },
			});
		}
	},
	component: () => <Outlet />,
});
