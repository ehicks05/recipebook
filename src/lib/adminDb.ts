import { init } from '@instantdb/admin';
import schema from '../instant.schema';

const appId = process.env.VITE_INSTANT_APP_ID;
const adminToken = process.env.INSTANT_APP_ADMIN_TOKEN;

if (!appId) {
	throw new Error('missing VITE_INSTANT_APP_ID');
}

export const adminDb = init({
	appId,
	adminToken,
	schema,
	useDateObjects: false,
});
