import type { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { api } from 'server/db-api';
import { Webhook } from 'svix';
import { env } from '../../../env';

const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

async function validateRequest(request: Request) {
	const payloadString = await request.text();
	const headerPayload = await headers();

	const svixHeaders = {
		'svix-id': headerPayload.get('svix-id') as string,
		'svix-timestamp': headerPayload.get('svix-timestamp') as string,
		'svix-signature': headerPayload.get('svix-signature') as string,
	};
	const wh = new Webhook(WEBHOOK_SECRET);
	return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(req: Request) {
	const payload = await validateRequest(req);
	console.log(payload);

	const {
		data: { id },
		type,
	} = payload;

	// create app user
	if (type === 'user.created') {
		await api.createUser({ id, displayName: payload.data.username });
	}
	// update app user
	if (type === 'user.updated') {
		await api.updateUser({ id, displayName: payload.data.username });
	}

	return Response.json({ message: 'Received' });
}
