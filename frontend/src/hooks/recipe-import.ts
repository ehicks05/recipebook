import { useQuery } from 'react-query';
import * as cheerio from 'cheerio';
import { Recipe } from 'schema-dts';
import authFetch from 'helpers/authFetch';
import { IRecipe } from 'types/types';
import { JSONPath } from 'jsonpath-plus';

const extractQuantity = (input: string) => {
  let endIndex = 0;
  while ('0123456789.,/ '.includes(input.charAt(endIndex))) {
    endIndex += 1;
  }
  return {
    quantity: input.slice(0, endIndex).trim(),
    rest: input.slice(endIndex).trim(),
  };
};

const parseIngredient = (input: string) => {
  const { quantity, rest } = extractQuantity(input);
  return { quantity, rest };
};

const schemaOrgRecipeToRecipeBookRecipe = (
  recipe: Recipe,
  authorName: string
): IRecipe => {
  return {
    id: '1337',
    name: recipe.name?.toString() || 'missing',
    description: recipe.description?.toString() || 'missing',
    author: {
      id: '',
      username: '',
      displayName: authorName || 'John Dough',
    },
    difficulty: 1,
    emoji: '🍲',
    servings: Number(recipe.recipeYield?.toString()) || 1,
    cookingTime: recipe.totalTime?.toString() || 'missin',
    course: recipe.recipeCategory?.toString() || 'missin',
    ingredients: ((recipe.recipeIngredient || []) as string[])
      .map(parseIngredient)
      .map((i, index) => ({
        id: '1337',
        index: String(index),
        name: i.rest,
        quantity: i.quantity,
        unit: '',
      })),
    directions: ((recipe.recipeInstructions || []) as string[]).map(
      (i, index) => ({
        index,
        text: i.text,
      })
    ),
  };
};

const deepFindByType = (json: any, type: string) => {
  return JSONPath({
    json,
    path: `$..[?(@["@type"] == "${type}" || @["@type"][0] == "${type}")]`,
  });
};

export const useFetchLdJsonRecipe = (url: string) => {
  const key = ['/recipe-import', url];
  const path = `/api/recipe-import?url=${url}`;

  const fetch = async () => {
    const data = await authFetch(path);
    const $ = cheerio.load(data.recipe);
    const ldJsonScriptTag = $('script')
      .get()
      .find(o => $(o).attr('type') === 'application/ld+json');
    const jsonString = ldJsonScriptTag?.children[0].data;
    const json = JSON.parse(jsonString);
    console.log({ json });

    const recipe: Recipe = deepFindByType(json, 'Recipe')?.[0];
    const authorName = JSONPath({ json, path: '$..author..name' })?.[0];

    console.log({ recipe, authorName });

    return schemaOrgRecipeToRecipeBookRecipe(recipe, authorName);
  };

  return useQuery<IRecipe, Error>(key, fetch, { enabled: !!url });
};
