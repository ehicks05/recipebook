import * as entities from 'entities';

import htmlparser from 'htmlparser';
import { JSONPath } from 'jsonpath-plus';
import find from 'lodash/find';
import type { Recipe } from 'schema-dts';
import type { CompleteRecipe } from 'server/db-api';

import { extractLeadingQuantity, parseIngredient } from './ingredient_parser';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const parseDirections = (input: string | any[]) => {
	if (typeof input === 'string') return [input];

	return input.flatMap((item) => {
		if (item['@type'] === 'HowToSection' || 'itemListElement' in item) {
			// consider making the HowToSection's name a special 'subheader' direction
			// return [{ text: item.name }, ...item.itemListElement];
			return item.itemListElement;
		}
		return item;
	});
};

const parseServings = (input: string) => {
	const { quantity } = extractLeadingQuantity(input);
	return Number(quantity) || 1;
};

const schemaOrgRecipeToRecipeBookRecipe = (
	recipe: Recipe,
	authorName: string,
	url: string,
): CompleteRecipe => {
	// @ts-ignore
	return {
		id: '1337',
		name: recipe.name?.toString() || 'missing',
		description: recipe.description?.toString() || 'missing',
		authorId: '1337',
		createdAt: new Date(),
		updatedAt: new Date(),
		author: {
			id: '',
			displayName: authorName || 'John Dough',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		difficulty: 1,
		emoji: '🍲', // '🍲',
		servings: parseServings(recipe.recipeYield?.toString() || ''),
		cookingTime: recipe.totalTime?.toString().replace('PT', '') || 'missing',
		course: recipe.recipeCategory?.toString() || 'missing',
		isPublished: true,
		source: url,
		imageSrc: '',
		ingredients: ((recipe.recipeIngredient || []) as string[])
			.map(parseIngredient)
			.map((i, index) => ({
				id: '1337',
				recipeId: '1337',
				index: String(index),
				name: i.name,
				quantity: i.quantity,
				unit: i.unit,
				createdAt: new Date(),
				updatedAt: new Date(),
			})),
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		directions: parseDirections(recipe.recipeInstructions || ([] as any)).map(
			(i, index) => ({
				id: '1337',
				recipeId: '1337',
				index,
				text: i.text,
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
		),
	};
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const deepFind = (json: any, type: string): any => {
	const result = find(
		json,
		(o) => o['@type'] === type || o['@type']?.includes(type),
	);
	if (result) return result;

	if (Array.isArray(json)) {
		return json.map((o) => deepFind(o, type)).filter((i) => i)?.[0];
	}
	if (typeof json === 'object') {
		return Object.values(json)
			.map((o) => deepFind(o, type))
			.filter((i) => i)?.[0];
	}
	return undefined;
};

export const parseLdJsonRecipe = (input: string, url: string) => {
	if (!input) return undefined;
	try {
		const handler: {
			dom: {
				raw: string;
				data: string;
				type: string;
				name?: string;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				attribs?: any;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				children: any[];
			}[];
		} = new htmlparser.DefaultHandler((error: Error, dom: { name: string }[]) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(dom);
			}
		});

		const parser = new htmlparser.Parser(handler);
		parser.parseComplete(input);
		const ldScriptJsonString = handler.dom
			.find((o) => o.name === 'html')
			?.children.find((o) => o.name === 'head')
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.children.find((o: any) => o.attribs?.type === 'application/ld+json')
			?.children?.[0]?.data;

		const htmlDecoded = entities.decodeHTML(ldScriptJsonString);
		const json = JSON.parse(htmlDecoded);

		const recipe: Recipe = deepFind({ json }, 'Recipe');
		const authorName = JSONPath({ json, path: '$..author..name' })?.[0];

		return schemaOrgRecipeToRecipeBookRecipe(recipe, authorName, url);
	} catch (err) {
		console.log(err);
	}
	return undefined;
};
