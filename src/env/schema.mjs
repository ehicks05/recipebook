// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
	DATABASE_URL: z.string().url(),
	NODE_ENV: z.enum(['development', 'test', 'production']),
	SUPABASE_URL: z.string(),
	SUPABASE_ANON_KEY: z.string(),
	SUPABASE_ADMIN_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
	WEBHOOK_SECRET: z.string(),
	UPLOADTHING_TOKEN: z.string(),
	OTEL_SERVICE_NAME: z.string(),
	OTEL_EXPORTER_OTLP_ENDPOINT: z.string(),
	OTEL_EXPORTER_OTLP_HEADERS: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
	DATABASE_URL: process.env.DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	SUPABASE_URL: process.env.SUPABASE_URL,
	SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	SUPABASE_ADMIN_KEY: process.env.SUPABASE_ADMIN_KEY,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
	WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
	UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
	OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
	OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
	OTEL_EXPORTER_OTLP_HEADERS: process.env.OTEL_EXPORTER_OTLP_HEADERS,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	NEXT_PUBLIC_SUPABASE_PROJECT_ID: z.string(),
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	NEXT_PUBLIC_UPLOADTHING_APP_ID: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
	NEXT_PUBLIC_SUPABASE_PROJECT_ID: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID,
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	NEXT_PUBLIC_UPLOADTHING_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
};
