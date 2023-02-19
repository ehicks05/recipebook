/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as cheerio from "cheerio";
import type { Recipe } from "schema-dts";
import { JSONPath } from "jsonpath-plus";
import { find } from "lodash";
import * as entities from "entities";
import type { CompleteRecipe } from "server/api/routers/example";

/**
 * Reference: https://unicode.org/reports/tr15/#Norm_Forms
 * Example: ¼ -> 1/4
 */
const normalizeUnicode = (input: string) =>
  input.normalize("NFKD").replace("⁄", "/");

const extractLeadingQuantity = (input: string) => {
  let endIndex = 0;
  while (
    "0123456789.,/ ".includes(input.charAt(endIndex)) &&
    endIndex <= input.length - 1
  ) {
    endIndex += 1;
  }
  return {
    quantity: input.slice(0, endIndex).trim(),
    rest: input.slice(endIndex).trim(),
  };
};

const parseIngredient = (input: string) => {
  const normalized = normalizeUnicode(input);
  const { quantity, rest } = extractLeadingQuantity(normalized);
  return { quantity, rest };
};

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
    servings: parseServings(recipe.recipeYield?.toString() || ""),
    cookingTime: recipe.totalTime?.toString().replace("PT", "") || "missing",
    course: recipe.recipeCategory?.toString() || "missing",
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
    directions: parseDirections(recipe.recipeInstructions || []).map(
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

export const parseLdJsonRecipe = (input: string) => {
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

    return schemaOrgRecipeToRecipeBookRecipe(recipe, authorName);
  } catch (err) {
    console.log(err);
  }
  return undefined;
};
