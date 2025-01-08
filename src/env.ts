import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
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
	},
	client: {
		NEXT_PUBLIC_SUPABASE_PROJECT_ID: z.string(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_UPLOADTHING_APP_ID: z.string(),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_SUPABASE_PROJECT_ID: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_UPLOADTHING_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
	},
});
