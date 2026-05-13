import { init } from '@instantdb/admin';
import schema from '@/instant.schema';
import { load } from '../lib/load';

const appId = process.env.INSTANT_APP_PROD_ID;
const adminToken = process.env.INSTANT_APP_PROD_ADMIN_TOKEN;

if (!appId) {
	throw new Error('missing INSTANT_APP_PROD_ID');
}

const prodDb = init({
	appId,
	adminToken,
	schema,
	useDateObjects: false,
});

const loadFromProd = async () => {
	const { $users } = await prodDb.query({
		$users: {
			recipes: {
				favoritedBy: { $: { fields: ['id'] } },
				image: {},
				ingredients: {},
			},
		},
	});

	load($users);
};

loadFromProd();
