// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from '@instantdb/react';

const _schema = i.schema({
	entities: {
		$files: i.entity({
			path: i.string().unique().indexed(),
			url: i.string(),
		}),
		$users: i.entity({
			email: i.string().unique().indexed().optional(),
			imageURL: i.string().optional(),
			type: i.string().optional(),
			imageUrl: i.string().optional(),
			displayName: i.string().optional().indexed(),
		}),

		recipes: i.entity({
			createdAt: i.date().indexed(),
			updatedAt: i.date(),
			cookingTime: i.string(),
			description: i.string().indexed(),
			emoji: i.string(),
			name: i.string().indexed(),
			servings: i.number(),
			isPublished: i.boolean(),
			source: i.string(),
			isFeatured: i.boolean().optional(),

			steps: i.json<{ text: string }[]>(),
		}),

		ingredients: i.entity({
			name: i.string().indexed(),
			quantity: i.string(),
			unit: i.string().optional(),
		}),
	},
	links: {
		$usersLinkedPrimaryUser: {
			forward: {
				on: '$users',
				has: 'one',
				label: 'linkedPrimaryUser',
				onDelete: 'cascade',
			},
			reverse: {
				on: '$users',
				has: 'many',
				label: 'linkedGuestUsers',
			},
		},
		recipeAuthor: {
			forward: {
				on: 'recipes',
				has: 'one',
				label: 'author',
				required: true,
				onDelete: 'cascade',
			},
			reverse: { on: '$users', has: 'many', label: 'recipes' },
		},
		recipeIngredients: {
			forward: { on: 'recipes', has: 'many', label: 'ingredients' },
			reverse: {
				on: 'ingredients',
				has: 'one',
				label: 'recipe',
				onDelete: 'cascade',
			},
		},
		recipeImage: {
			forward: { on: 'recipes', has: 'one', label: 'image' },
			reverse: { on: '$files', has: 'one', label: 'recipe', onDelete: 'cascade' },
		},
		userFavorites: {
			forward: { on: '$users', has: 'many', label: 'favoriteRecipes' },
			reverse: { on: 'recipes', has: 'many', label: 'favoritedBy' },
		},
	},
	rooms: {
		todos: {
			presence: i.entity({}),
		},
	},
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
