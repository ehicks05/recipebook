import { createRouter } from '@tanstack/react-router';
import { GlobalErrorComponent } from './GlobalErrorComponent';
import { GlobalNotFoundComponent } from './GlobalNotFoundComponent';
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {},
		defaultNotFoundComponent: GlobalNotFoundComponent,
		defaultErrorComponent: GlobalErrorComponent,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
	});

	return router;
};
