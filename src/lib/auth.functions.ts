import { createIsomorphicFn, createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { auth } from '@/lib/auth';
import { authClient } from './auth-client';

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	return session;
});

export const ensureSession = createIsomorphicFn()
	.server(async () => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });
		return session;
	})
	.client(async () => {
		const session = await authClient.getSession();
		return session.data;
	});
