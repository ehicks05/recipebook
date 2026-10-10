// src/lib/auth.middleware.ts
import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { auth } from './auth'; // Your Better Auth instance setup

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	// 1. Grab the current incoming server request
	const request = getRequest();

	// 2. Pass headers directly to Better Auth's session API
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	// 3. Reject unauthenticated requests immediately
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	// 4. Forward the user and session down to the handler context
	return next({
		context: {
			user: session.user,
			session: session.session,
		},
	});
});
