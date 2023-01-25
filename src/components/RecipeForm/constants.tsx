"use client";
import React from "react";
import { validateQuantity } from "./utils";
import { z } from "zod";
import type { direction, ingredient, recipe } from "@prisma/client";

const UNITS = ["tsp", "tbsp", "cup", "oz", "lb", "ml", "L", "g"];
const UNIT_OPTIONS = ["", ...UNITS].map((unit) => (
  <option key={unit} value={unit}>
    {unit}
  </option>
));

type FormIngredient = Omit<
  ingredient,
  "id" | "recipeId" | "createdAt" | "updatedAt"
>;
type FormDirection = Omit<
  direction,
  "id" | "recipeId" | "createdAt" | "updatedAt"
>;
type FormRecipe = Omit<
  recipe,
  "id" | "authorId" | "createdAt" | "updatedAt"
> & {
  ingredients: FormIngredient[];
  directions: FormDirection[];
  author: any;
};

const DEFAULT_INGREDIENT: FormIngredient = {
  name: "",
  quantity: "",
  unit: "",
};
const DEFAULT_DIRECTION: FormDirection = { index: 0, text: "" };
const DEFAULT_RECIPE: FormRecipe = {
  name: "",
  description: "",
  emoji: "\uD83E\uDD58",
  difficulty: 1,
  cookingTime: "",
  servings: 1,
  course: "",
  author: { id: "", username: "unknown", displayName: "Unknown" },
  ingredients: [DEFAULT_INGREDIENT],
  directions: [DEFAULT_DIRECTION],
};

const INGREDIENT_SCHEMA = z.object({
  name: z.string().min(1),
  quantity: z.custom(validateQuantity),
  unit: z.string(),
});

const DIRECTION_SCHEMA = z.object({
  index: z.number(),
  text: z.string().min(1),
});

const RECIPE_SCHEMA = z.object({
  name: z.string().min(1).max(40),
  description: z.string().min(1),
  cookingTime: z.string().min(1),
  servings: z.number().min(1),
  emoji: z.string().length(2),
  difficulty: z.coerce.number(),
  ingredients: INGREDIENT_SCHEMA.array(),
  directions: DIRECTION_SCHEMA.array(),
});

export type { FormRecipe };
export {
  UNITS,
  UNIT_OPTIONS,
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
  INGREDIENT_SCHEMA,
  DIRECTION_SCHEMA,
  RECIPE_SCHEMA,
};
