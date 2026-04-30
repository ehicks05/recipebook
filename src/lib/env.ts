import { z } from 'zod';

const Env = z.object({
	appId: z.string(),
	adminToken: z.string(),
});

const result = Env.safeParse({
	appId: import.meta.env.VITE_INSTANT_APP_ID,
	adminToken: import.meta.env.INSTANT_APP_ADMIN_TOKEN,
});

if (!result.success) {
	throw new Error(`Invalid environment variables: ${result.error.message}`);
}

const env = result.data;

export { env };
