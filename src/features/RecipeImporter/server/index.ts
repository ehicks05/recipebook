import * as cheerio from 'cheerio';
import { find } from 'es-toolkit/compat';
import { JSONPath } from 'jsonpath-plus';
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
	try {
		if (!htmlString) {
			throw new Error('No document found');
		}
		const ldJsonScriptText = htmlStringToLdJsonScriptText(htmlString);
		if (!ldJsonScriptText || ldJsonScriptText.length === 0) {
			throw new Error('Unable to find or extract JSON-LD within document');
		}

		const json = JSON.parse(ldJsonScriptText);

		const recipe: Recipe = deepFind({ json }, 'Recipe');
		const authorName = JSONPath({ json, path: '$..author..name' })?.[0];

		return {
			error: undefined,
			recipe: schemaOrgRecipeToRecipeBookRecipe(recipe, authorName, url),
		};
	} catch (err) {
		return { error: err as Error, recipe: undefined };
	}
};
