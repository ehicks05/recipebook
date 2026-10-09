import { readFile } from 'node:fs/promises';
import * as nodepath from 'node:path';
import { db } from '@/db';
import { ingredients, recipes, users } from '@/db/schema';

const BASE = './backups/instant';

const loadFromBackup = async () => {
	const [_users, _recipes, _ingredients] = await Promise.all([
		readFile(nodepath.resolve(BASE, '$users.jsonl'), { encoding: 'utf-8' }),
		readFile(nodepath.resolve(BASE, 'recipes.jsonl'), { encoding: 'utf-8' }),
		readFile(nodepath.resolve(BASE, 'ingredients.jsonl'), { encoding: 'utf-8' }),
	]);

	const data = {
		users: _users
			.trim()
			.split('\n')
			.map(JSON.parse)
			.map((o) => o.entity),
		recipes: _recipes
			.trim()
			.split('\n')
			.map(JSON.parse)
			.map((o) => o.entity)
			.map((o) => ({ ...o, authorId: o.author })),
		ingredients: _ingredients
			.trim()
			.split('\n')
			.map(JSON.parse)
			.map((o) => o.entity),
	};

	await Promise.all([db.delete(users), db.delete(recipes), db.delete(ingredients)]);

	await db.insert(users).values(data.users);
	await db.insert(recipes).values(data.recipes);
	await db.insert(ingredients).values(
		data.ingredients.map((o) => ({
			...o,
			recipeId: data.recipes.find((r) => r.ingredients.includes(o.id)).id,
		})),
	);
};

loadFromBackup();
