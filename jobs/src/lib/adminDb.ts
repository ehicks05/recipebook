import { init } from '@instantdb/admin';
import schema from './instant.schema.js';

process.loadEnvFile();

const appId = process.env.INSTANT_APP_ID!;
const adminToken = process.env.INSTANT_APP_ADMIN_TOKEN!;

export const adminDb = init({
	appId,
	adminToken,
	schema,
	useDateObjects: false,
});
