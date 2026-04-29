import * as cheerio from 'cheerio';
import { JSONPath } from 'jsonpath-plus';
import find from 'lodash/find';
import type { Recipe } from 'schema-dts';
import { schemaOrgRecipeToRecipeBookRecipe } from './schema-org-mapper';

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

const htmlStringToLdJsonScriptText = (htmlString: string) => {
	const $ = cheerio.load(htmlString);
	return $.extract({ ldJson: '[type=application/ld+json]' }).ldJson;
};

export const parseLdJsonRecipe = (htmlString: string, url: string) => {
	if (!htmlString) return undefined;
	try {
		const ldJsonScriptText = htmlStringToLdJsonScriptText(htmlString);
		if (!ldJsonScriptText || ldJsonScriptText.length === 0) return undefined;

		const json = JSON.parse(ldJsonScriptText);

		const recipe: Recipe = deepFind({ json }, 'Recipe');
		const authorName = JSONPath({ json, path: '$..author..name' })?.[0];

		return schemaOrgRecipeToRecipeBookRecipe(recipe, authorName, url);
	} catch (err) {
		console.log(err);
	}
	return undefined;
};
