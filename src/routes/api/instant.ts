import { createInstantRouteHandler } from '@instantdb/react';
import { createFileRoute } from '@tanstack/react-router';

const appId = process.env.VITE_INSTANT_APP_ID;
if (!appId) {
	throw new Error('missing VITE_INSTANT_APP_ID');
}

const handler = createInstantRouteHandler({
	appId,
});

export const Route = createFileRoute('/api/instant')({
	server: {
		handlers: {
			POST: async ({ request }) => {
				return handler.POST(request);
			},
		},
	},
});
