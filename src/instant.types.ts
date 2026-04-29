import type { InstaQLEntity, InstaQLResult } from "@instantdb/react";
import type { AppSchema } from "./instant.schema";

export type Recipe = InstaQLResult<
	AppSchema,
	{ recipes: { author: {}; ingredients: {}; favoritedBy: {} } }
>["recipes"][number];

export type Ingredient = InstaQLEntity<AppSchema, 'ingredients'>;