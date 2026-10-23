import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { GlobalErrorComponent } from './GlobalErrorComponent';
import { GlobalNotFoundComponent } from './GlobalNotFoundComponent';
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5000,
			},
		},
	});

	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultNotFoundComponent: GlobalNotFoundComponent,
		defaultErrorComponent: GlobalErrorComponent,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
};
