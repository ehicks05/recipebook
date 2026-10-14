import { readFile } from 'node:fs/promises';
import * as nodepath from 'node:path';
import { db } from '@/db';
import { recipes } from '@/db/schema';

const BASE = './backups/instant';
const USER_ID = 'R2Nr7OY0IFjB5Pdmh5R4yUlyaEV8JA3T';

const loadFromBackup = async () => {
	const [recipesFile, ingredientsFile] = await Promise.all([
		readFile(nodepath.resolve(BASE, 'recipes.jsonl'), { encoding: 'utf-8' }),
		readFile(nodepath.resolve(BASE, 'ingredients.jsonl'), { encoding: 'utf-8' }),
	]);

	const _ingredients = ingredientsFile
		.trim()
		.split('\n')
		.map(JSON.parse)
		.map((o) => ({ ...o.entity, createdAt: o.createdAt }));

	const _recipes = recipesFile
		.trim()
		.split('\n')
		.map(JSON.parse)
		.map((o) => o.entity)
		.map((o) => ({ ...o, authorId: USER_ID }))
		.map((recipe) => ({
			...recipe,
			ingredients: recipe.ingredients
				.map((ingredientId: string) =>
					_ingredients.find((i) => i.id === ingredientId),
				)
				.sort((o1, o2) => o1.createdAt - o2.createdAt),
		}));

	await db.delete(recipes);
	await db.insert(recipes).values(_recipes);
};

loadFromBackup();
