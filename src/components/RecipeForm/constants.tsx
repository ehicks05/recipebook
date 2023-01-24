"use client";
import React from "react";
import type { IDirection, IIngredient, IRecipe } from "types/types";
import { validateQuantity } from "./utils";
import { z } from "zod";

const UNITS = ["tsp", "tbsp", "cup", "oz", "lb", "ml", "L", "g"];
const UNIT_OPTIONS = ["", ...UNITS].map((unit) => (
  <option key={unit} value={unit}>
    {unit}
  </option>
));

type FormIngredient = Omit<IIngredient, "id">;
type FormDirection = Omit<IDirection, "id">;
type FormRecipe = Omit<IRecipe, "id" | "ingredients" | "directions"> & {
  ingredients: FormIngredient[];
  directions: FormDirection[];
};

const DEFAULT_INGREDIENT: FormIngredient = {
  index: "0",
  name: "",
  quantity: "",
  unit: "",
};
const DEFAULT_DIRECTION: IDirection = { index: 0, text: "" };
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

const RECIPE_SCHEMA = z.object({
  name: z.string().max(40),
  description: z.string(),
  cookingTime: z.string().min(1),
  servings: z.number().min(1),
  emoji: z.string(),
  difficulty: z.coerce.number(),
  ingredients: z
    .object({
      name: z.string(),
      quantity: z.custom(validateQuantity),
      unit: z.string(),
    })
    .array(),
  directions: z
    .object({
      index: z.number(),
      text: z.string(),
    })
    .array(),
});

export {
  UNITS,
  UNIT_OPTIONS,
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
  RECIPE_SCHEMA,
};
