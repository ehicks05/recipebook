import { IRecipe } from '../../types/types';

function updateClipboard(newClip: string) {
  navigator.clipboard.writeText(newClip).then(
    function (e) {
      console.log(e);
    },
    function (e) {
      console.log(e);
    },
  );
}

// How /recipe data differs from the json file:
// 1. id is added on recipe and nested objects
// 2. audit dates are added on recipe and all nested objects
// 3. author is added on recipe
// 4. emoji is a literal emoji
// 5. direction indexes are added
function stripRecipe(recipe: IRecipe) {
  const ingredients = recipe.ingredients.map(i => ({
    name: i.name,
    quantity: i.quantity,
    unit: i.unit,
  }));
  const directions = recipe.directions.map(d => ({
    index: d.index,
    text: d.text,
  }));
  const author = recipe.author.id;
  const {
    id,
    ingredients: i,
    directions: d,
    author: a,
    createdAt,
    updatedAt,
    ...rest
  } = recipe;

  return { ...rest, ingredients, directions };
}

export { updateClipboard, stripRecipe };
