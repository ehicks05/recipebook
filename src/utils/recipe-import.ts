/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as cheerio from "cheerio";
import type { Recipe } from "schema-dts";
import { JSONPath } from "jsonpath-plus";
import find from "lodash/find";
import * as entities from "entities";
import type { CompleteRecipe } from "server/api/routers/example";
import { extractLeadingQuantity, parseIngredient } from "./ingredient_parser";

const parseDirections = (input: string | any[]) => {
  if (typeof input === "string") return [input];

  return input
    .map((item) => {
      if (item["@type"] === "HowToSection" || "itemListElement" in item) {
        // consider making the HowToSection's name a special 'subheader' direction
        // return [{ text: item.name }, ...item.itemListElement];
        return item.itemListElement;
      }
      return item;
    })
    .flat();
};

const parseServings = (input: string) => {
  const { quantity } = extractLeadingQuantity(input);
  return Number(quantity) || 1;
};

const schemaOrgRecipeToRecipeBookRecipe = (
  recipe: Recipe,
  authorName: string,
  url: string
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
    emoji: "🍲", // '🍲',
    servings: parseServings(recipe.recipeYield?.toString() || ""),
    cookingTime: recipe.totalTime?.toString().replace("PT", "") || "missing",
    course: recipe.recipeCategory?.toString() || "missing",
    isPublished: true,
    source: url,
    ingredients: ((recipe.recipeIngredient || []) as string[])
      .map(parseIngredient)
      .map((i, index) => ({
        id: "1337",
        recipeId: "1337",
        index: String(index),
        name: i.name,
        quantity: i.quantity,
        unit: i.unit,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    directions: parseDirections(recipe.recipeInstructions || ([] as any)).map(
      (i, index) => ({
        id: "1337",
        recipeId: "1337",
        index,
        text: i.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const parseLdJsonRecipe = (input: string, url: string) => {
  if (!input) return undefined;
  try {
    const $ = cheerio.load(input);
    const ldJsonScriptTag = $("script")
      .get()
      .find((o) => $(o).attr("type") === "application/ld+json");
    if (!ldJsonScriptTag?.children[0]) return undefined;

    const jsonString = (ldJsonScriptTag?.children[0] as { data: string }).data;
    const htmlDecoded = entities.decodeHTML(jsonString);
    const json = JSON.parse(htmlDecoded);
    console.log({ json });

    const recipe: Recipe = deepFind({ json }, "Recipe");
    const authorName = JSONPath({ json, path: "$..author..name" })?.[0];

    console.log({ recipe, authorName });

    return schemaOrgRecipeToRecipeBookRecipe(recipe, authorName, url);
  } catch (err) {
    console.log(err);
  }
  return undefined;
};
