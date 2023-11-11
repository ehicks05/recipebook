"use client";
import React from "react";
import { validateQuantity } from "./utils";
import { z } from "zod";
import type { direction, ingredient, recipe } from "@prisma/client";

const UNITS = ["tsp", "tbsp", "oz", "cup", "lb", "ml", "L", "g"];
const UNIT_OPTIONS = ["", ...UNITS].map((unit) => (
  <option key={unit} value={unit}>
    {unit}
  </option>
));

type FormIngredient = Omit<ingredient, "id" | "recipeId">;
type FormDirection = Omit<direction, "id" | "recipeId">;
type FormRecipe = Omit<
  recipe,
  "id" | "authorId" | "createdAt" | "updatedAt" | "imageSrc"
> & {
  ingredients: FormIngredient[];
  directions: FormDirection[];
  // author: Record<string, string>;
};

const DEFAULT_INGREDIENT: FormIngredient = {
  name: "",
  quantity: "",
  unit: "",
};
const DEFAULT_DIRECTION: FormDirection = {
  index: 0,
  text: "",
};
const DEFAULT_RECIPE: FormRecipe = {
  name: "Your new recipe!",
  description: "",
  emoji: "\uD83E\uDD58",
  difficulty: 1,
  cookingTime: "15",
  servings: 4,
  course: "",
  isPublished: true,
  source: null,
  // author: { id: "", username: "unknown", displayName: "Unknown" },
  ingredients: [
    {
      name: "sample ingredient",
      quantity: "1",
      unit: "tsp",
    },
    {
      name: "sample ingredient 2",
      quantity: "1",
      unit: "tsp",
    },
  ],
  directions: [
    { index: 0, text: "Add a step here..." },
    { index: 1, text: "And another step here..." },
  ],
};

const INGREDIENT_SCHEMA = z.object({
  name: z.string().min(1),
  quantity: z.string().refine(validateQuantity, {
    message: "Must be a valid quantity like 1 3/4",
  }),
  unit: z.string().nullable(),
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
  emoji: z.string().min(1, "Pick an emoji").max(3),
  difficulty: z.coerce.number(),
  isPublished: z.boolean(),
  source: z.string().nullable(),
  ingredients: INGREDIENT_SCHEMA.array().min(1),
  directions: DIRECTION_SCHEMA.array().min(1),
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
