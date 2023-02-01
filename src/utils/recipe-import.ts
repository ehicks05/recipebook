/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as cheerio from "cheerio";
import type { Recipe } from "schema-dts";
import { JSONPath } from "jsonpath-plus";
import { find } from "lodash";
import type { CompleteRecipe } from "server/api/routers/example";

const extractQuantity = (input: string) => {
  let endIndex = 0;
  while ("0123456789.,/ ".includes(input.charAt(endIndex))) {
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
): CompleteRecipe => {
  return {
    id: "1337",
    name: recipe.name?.toString() || "missing",
    description: recipe.description?.toString() || "missing",
    authorId: "1337",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "",
      displayName: authorName || "John Dough",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    difficulty: 1,
    emoji: "", // '🍲',
    servings: Number(recipe.recipeYield?.toString()) || 1,
    cookingTime: recipe.totalTime?.toString().replace("PT", "") || "missin",
    course: recipe.recipeCategory?.toString() || "missin",
    isPublished: false,
    ingredients: ((recipe.recipeIngredient || []) as string[])
      .map(parseIngredient)
      .map((i, index) => ({
        id: "1337",
        recipeId: "1337",
        index: String(index),
        name: i.rest,
        quantity: i.quantity,
        unit: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    directions: (
      (recipe.recipeInstructions || []) as unknown as { text: string }[]
    ).map((i, index) => ({
      id: "1337",
      recipeId: "1337",
      index,
      text: i.text,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  };
};

const deepFind = (json: any, type: string): any => {
  const result = find(
    json,
    (o) => o["@type"] === type || o["@type"]?.includes(type)
  );
  if (result) return result;

  if (Array.isArray(json)) {
    return json.map((o) => deepFind(o, type)).filter((i) => i)?.[0];
  }
  if (typeof json === "object") {
    return Object.values(json)
      .map((o) => deepFind(o, type))
      .filter((i) => i)?.[0];
  }
  return undefined;
};

export const parseLdJsonRecipe = (input: string) => {
  if (!input) return undefined;
  try {
    const $ = cheerio.load(input);
    const ldJsonScriptTag = $("script")
      .get()
      .find((o) => $(o).attr("type") === "application/ld+json");
    if (!ldJsonScriptTag?.children[0]) return undefined;

    const jsonString = (ldJsonScriptTag?.children[0] as { data: string }).data;
    const json = JSON.parse(jsonString);
    console.log({ json });

    const recipe: Recipe = deepFind({ json }, "Recipe");
    const authorName = JSONPath({ json, path: "$..author..name" })?.[0];

    console.log({ recipe, authorName });

    return schemaOrgRecipeToRecipeBookRecipe(recipe, authorName);
  } catch (err) {
    console.log(err);
  }
  return undefined;
};
