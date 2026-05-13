import { load } from '../lib/load';
import { prodDb } from './prodDb';

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
