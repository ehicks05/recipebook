import { omit } from "lodash";
import type { CompleteRecipe } from "server/api/routers/example";

function updateClipboard(newClip: string) {
  navigator.clipboard.writeText(newClip).then(
    (e) => console.log(e),
    (e) => console.log(e)
  );
}

// How /recipe data differs from the json file:
// 1. id is added on recipe and nested objects
// 2. audit dates are added on recipe and all nested objects
// 3. author is added on recipe
// 4. emoji is a literal emoji
// 5. direction indexes are added
function stripRecipe(recipe: CompleteRecipe) {
  const removedFields = ["id", "createdAt", "updatedAt"];

  return {
    ...omit(recipe, [...removedFields, "author"]),
    ingredients: recipe.ingredients.map((i) => omit(i, [...removedFields])),
    directions: recipe.directions.map((d) =>
      omit(d, [...removedFields, "index"])
    ),
  };
}

export { updateClipboard, stripRecipe };
