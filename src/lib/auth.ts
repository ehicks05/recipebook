import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { db } from '@/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [
		tanstackStartCookies(), // make sure this is the last plugin in the array
	],
	advanced: {
		database: {
			joins: true,
		},
	},
});
