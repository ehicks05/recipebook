import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { adminDb } from '@/lib/adminDb';

export const instantUserMiddleware = createMiddleware().server(async ({ next }) => {
	const request = getRequest();

	// /api/instant keeps your user's cookie in sync
	// this reads the cookie from the request to see who made it
	const user = await adminDb.auth.getUserFromRequest(request);
	return next({
		context: { user },
	});
});
