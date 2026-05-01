// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from '@instantdb/react';

const rules = {
	attrs: {
		allow: {
			create: 'false',
		},
	},
	$files: {
		allow: {
			view: 'true',
			create: 'auth.id != null',
			delete: 'auth.id != null',
		},
	},
	$users: {
		allow: {
			create: 'true',
			view: 'true',
		},
		fields: {
			email: 'auth.id == data.id',
			type: 'auth.id == data.id',
		},
	},
} satisfies InstantRules;

export default rules;
