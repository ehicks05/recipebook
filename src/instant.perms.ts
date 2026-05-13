// Docs: https://www.instantdb.com/docs/permissions
import type { InstantRules } from '@instantdb/react';

const rules = {
	attrs: {
		allow: {
			create: 'false',
		},
	},
	$files: {
		bind: {
			isOwner: 'data.path.startsWith(auth.id)',
		},
		allow: {
			view: 'true',
			create: 'isOwner',
			delete: 'isOwner',
		},
	},
	$users: {
		bind: {
			self: 'auth.id == data.id',
		},
		allow: {
			create: 'true',
			view: 'true',
			update: 'self',
			delete: 'false',
		},
		fields: {
			email: 'self',
			type: 'self',
		},
	},
	recipes: {
		bind: {
			isAuthor: "auth.id in data.ref('author.id')",
		},
		allow: {
			view: 'data.isPublished || isAuthor',
			create: 'auth.id != null',
			update: 'isAuthor',
			delete: 'isAuthor',
		},
	},
	ingredients: {
		bind: {
			isAuthor: "auth.id in data.ref('recipe.author.id')",
			isPublished: "true in data.ref('recipe.isPublished')",
		},
		allow: {
			view: 'isPublished || isAuthor', // questionable necessity
			create: 'auth.id != null',
			update: 'isAuthor',
			delete: 'isAuthor',
		},
	},
} satisfies InstantRules;

export default rules;
