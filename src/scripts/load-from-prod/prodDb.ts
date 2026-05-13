import { init } from '@instantdb/admin';
import schema from '@/instant.schema';

const appId = process.env.INSTANT_APP_PROD_ID!;
const adminToken = process.env.INSTANT_APP_PROD_ADMIN_TOKEN;

export const prodDb = init({
	appId,
	adminToken,
	schema,
	useDateObjects: false,
});
