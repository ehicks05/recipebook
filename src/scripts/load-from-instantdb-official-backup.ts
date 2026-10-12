import { readFile } from 'node:fs/promises';
import * as nodepath from 'node:path';
import { db } from '@/db';
import { recipes as recipesModel, users } from '@/db/schema';

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
			.map((o) => ({ ...o.entity, createdAt: o.createdAt })),
	};

	const recipes = data.recipes.map((recipe) => ({
		...recipe,
		ingredients: recipe.ingredients
			.map((ingredientId: string) =>
				data.ingredients.find((ingredient) => ingredient.id === ingredientId),
			)
			.sort((o1, o2) => o1.createdAt - o2.createdAt)
			// .map((ingredient) => ({ ...ingredient, createdAt: undefined })),
	}));

	await Promise.all([db.delete(users), db.delete(recipesModel)]);

	await db.insert(users).values(data.users);
	await db.insert(recipesModel).values(recipes);
};

loadFromBackup();
