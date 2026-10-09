import { defineRelations } from 'drizzle-orm';
import {
	boolean,
	index,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from 'drizzle-orm/pg-core';

// ==========================================
// 1. Tables Definition
// ==========================================
export const users = pgTable(
	'users',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		email: text('email'), // optional
		imageURL: text('image_url_camel'), // map to exact string from instantdb if migration data exists
		imageUrl: text('image_url'),
		type: text('type'),
		displayName: text('display_name'),
		createdAt: timestamp('created_at', { withTimezone: true }),
	},
	(table) => [
		uniqueIndex('users_email_unique_idx').on(table.email),
		index('users_email_idx').on(table.email),
		index('users_display_name_idx').on(table.displayName),
	],
);

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
		isFeatured: boolean('is_featured'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),

		// JSON field for steps array: [{ text: string }]
		steps: jsonb('steps').$type<{ text: string }[]>().notNull(),

		// Relations
		authorId: uuid('author_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
	},
	(table) => [
		index('recipes_created_at_idx').on(table.createdAt),
		index('recipes_description_idx').on(table.description),
		index('recipes_name_idx').on(table.name),
	],
);

export const ingredients = pgTable(
	'ingredients',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull(),
		quantity: text('quantity').notNull(),
		unit: text('unit'),

		recipeId: uuid('recipe_id')
			.notNull()
			.references(() => recipes.id, { onDelete: 'cascade' }),
	},
	(table) => [index('ingredients_name_idx').on(table.name)],
);

// Join table for many-to-many relationship: userFavorites
export const userFavorites = pgTable(
	'user_favorites',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
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

export const relations = defineRelations(
	{ users, recipes, ingredients, userFavorites },
	(r) => ({
		users: {
			recipes: r.many.recipes({
				from: r.users.id,
				to: r.recipes.authorId,
			}),
			favoriteRecipes: r.many.recipes({
				from: r.users.id.through(r.userFavorites.userId),
				to: r.recipes.id.through(r.userFavorites.recipeId),
			}),
		},
		recipes: {
			author: r.one.users({
				from: r.recipes.authorId,
				to: r.users.id,
			}),
			ingredients: r.many.ingredients({
				from: r.recipes.id,
				to: r.ingredients.recipeId,
			}),
		},
	}),
);
