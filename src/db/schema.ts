import { defineRelations } from 'drizzle-orm';
import {
	boolean,
	index,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { authRelations, user } from './auth-schema';

// ==========================================
// 1. Tables Definition
// ==========================================
export const recipes = pgTable(
	'recipes',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		cookingTime: text('cooking_time').notNull(),
		emoji: text('emoji').notNull(),
		servings: integer('servings').notNull(),
		isPublished: boolean('is_published').notNull(),
		source: text('source').notNull(),
		isFeatured: boolean('is_featured').notNull().default(false),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true })
			.notNull()
			.defaultNow(),

		// JSON field for steps array: [{ text: string }]
		steps: jsonb('steps').$type<{ text: string }[]>().notNull(),

		ingredients: jsonb('ingredients')
			.$type<{ name: string; quantity?: string; unit?: string }[]>()
			.notNull(),

		// Relations
		authorId: text('author_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(table) => [
		index('recipes_created_at_idx').on(table.createdAt),
		index('recipes_description_idx').on(table.description),
		index('recipes_name_idx').on(table.name),
	],
);

// Join table for many-to-many relationship: userFavorites
export const userFavorites = pgTable(
	'user_favorites',
	{
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		recipeId: uuid('recipe_id')
			.notNull()
			.references(() => recipes.id, { onDelete: 'cascade' }),
	},
	(table) => [
		index('user_favorites_user_id_idx').on(table.userId),
		index('user_favorites_recipe_id_idx').on(table.recipeId),
	],
);

// ==========================================
// 2. Relations Definition (RQB)
// ==========================================

const _relations = defineRelations({ user, recipes, userFavorites }, (r) => ({
	user: {
		recipes: r.many.recipes({
			from: r.user.id,
			to: r.recipes.authorId,
		}),
		favoriteRecipes: r.many.recipes({
			from: r.user.id.through(r.userFavorites.userId),
			to: r.recipes.id.through(r.userFavorites.recipeId),
		}),
	},
	recipes: {
		author: r.one.user({
			from: r.recipes.authorId,
			to: r.user.id,
			optional: false,
		}),
		favoritedBy: r.many.user({
			from: r.recipes.id.through(r.userFavorites.recipeId),
			to: r.user.id.through(r.userFavorites.userId),
		}),
	},
}));

export * from './auth-schema';

export const relations = { ..._relations, ...authRelations };
