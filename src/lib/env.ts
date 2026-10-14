import { z } from 'zod';

const Env = z.object({
	databaseUrl: z.string(),
});

const result = Env.safeParse({
	databaseUrl: import.meta.env.DATABASE_URL,
});

if (!result.success) {
	throw new Error(`Invalid environment variables: ${result.error.message}`);
}

const env = result.data;

export { env };
