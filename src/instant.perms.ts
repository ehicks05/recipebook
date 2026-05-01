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
			isPublished: "true in data.ref('recipe.isPublished')"
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
