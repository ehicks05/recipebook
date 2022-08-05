import Promise from "bluebird";
import * as edgedb from "edgedb";
import e from "../dbschema/edgeql-js";
import client from "../edgeDbClient";
import recipes from "../recipes.json";

const truncateTables = async () => {
  const deletions = [
    e.delete(e.Recipe),
    e.delete(e.User),
    e.delete(e.Ingredient),
    e.delete(e.Step),
  ];

  await Promise.all(deletions.map((deletion) => deletion.run(client)));
};

const upsertDefaultUser = async () => {
  const query = e.select(e.User, (user) => ({
    filter: e.op(user.displayName, "=", "John Dough"),
  }));
  const existing = await query.run(client);
  if (existing) {
    return existing;
  }

  const insert = e.insert(e.User, {
    auth_id: e.uuid_generate_v1mc(),
    displayName: "John Dough",
  });
  const result = await insert.run(client);
  return result;
};

interface JsonRecipe {
  cookingTime: string;
  course?: string;
  description?: string;
  difficulty: string | number;
  emoji: string;
  name: string;
  servings: string | number;
  ingredients: { quantity: string; unit: string; name: string }[];
  directions: { text: string }[];
}

// const createRecipesFromJsonExperiment = async (recipes: JsonRecipe[]) => {
//   const defaultUser = await upsertDefaultUser();
//   if (!defaultUser) {
//     throw new Error("unable to find default user");
//   }

//   const query = e.params({ items: e.json }, (params) => {
//     return e.for(e.json_array_unpack(params.items), (r) => {
//       const ingredients = e.for(e.json_array_unpack(r.ingredients), (i) => {
//         return e.insert(e.Ingredient, {
//           name: e.cast(e.str, i.name),
//           quantity: e.cast(e.str, i.quantity),
//           unit: e.cast(e.str, i.unit),
//         });
//       });
//       let stepIndex = 0;
//       const steps = e.for(e.json_array_unpack(params.items), (i) => {
//         return e.insert(e.Step, {
//           i: stepIndex++,
//           text: e.cast(e.str, i.text),
//         });
//       });

//       return e.insert(e.Recipe, {
//         name: e.cast(e.str, r.name),
//         emoji: e.cast(e.str, r.emoji),
//         description: e.cast(e.str, r.description || "no description found"),
//         totalTime: new edgedb.Duration(0, 0, 0, 0, 0, Number(r.cookingTime)),
//         difficulty: Number(r.difficulty || 2),
//         servings: Number(r.servings),
//         course: e.cast(e.str, r.course || ""),
//         createdAt: e.datetime_current(),
//         updatedAt: e.datetime_current(),
//         author: e.select(e.User, (user) => ({
//           filter: e.op(user.id, "=", e.uuid(defaultUser.id)),
//         })),
//         ingredients: e.set(ingredients),
//         steps: e.set(steps),
//       });
//     });
//   });

//   return await query.run(client, {
//     items: recipes,
//   });
// };

const createRecipesFromJson = async (recipes: JsonRecipe[]) => {
  const defaultUser = await upsertDefaultUser();
  if (!defaultUser) {
    throw new Error("unable to find default user");
  }

  const insertRecipes = recipes.map((r) => {
    const ingredients = r.ingredients.map((i) =>
      e.insert(e.Ingredient, {
        name: i.name,
        quantity: i.quantity,
        unit: i.unit,
      })
    );
    const steps = r.directions.map((i, index) =>
      e.insert(e.Step, {
        i: index,
        text: i.text,
      })
    );

    return e.insert(e.Recipe, {
      name: r.name,
      emoji: r.emoji,
      description: r.description || "no description found",
      totalTime: new edgedb.Duration(0, 0, 0, 0, 0, Number(r.cookingTime)),
      difficulty: Number(r.difficulty || 2),
      servings: Number(r.servings),
      course: r.course || "",
      createdAt: e.datetime_current(),
      updatedAt: e.datetime_current(),
      author: e.assert_single(
        e.select(e.User, (user) => ({
          filter: e.op(user.displayName, "=", "John Dough"),
        }))
      ),
      ingredients: e.set(...ingredients),
      steps: e.set(...steps),
    });
  });

  await Promise.map(insertRecipes, (insertRecipe) => insertRecipe.run(client), {
    concurrency: 1,
  });
};

const dropAndLoad = async () => {
  await truncateTables();
  await createRecipesFromJson(recipes);
};

const addNewRecipes = async () => {
  const query = e.select(e.Recipe, () => ({
    name: true,
  }));
  const existingRecipes = (await query.run(client)).map(
    (recipe) => recipe.name
  );

  const newRecipes = recipes.filter(
    (recipe) => !existingRecipes.includes(recipe.name)
  );
  console.log({ newRecipes: newRecipes.map((recipe) => recipe.name) });

  if (newRecipes.length > 0) {
    const result = await createRecipesFromJson(newRecipes);
    console.log({ result });
  }
};

const seed = async (mode: string) => {
  console.log("seeding started");
  console.log("mode:" + mode);
  switch (mode) {
    case "addNew":
      await addNewRecipes();
      break;
    case "dropAndLoad":
      await dropAndLoad();
      break;
    default:
      throw new Error("unknown seed mode");
  }
  console.log("seeding finished");
};

const myArgs = process.argv.slice(2);
const mode = myArgs[0];
seed(mode);
