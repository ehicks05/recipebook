import { appUser, PrismaClient } from "@prisma/client";
import recipes from "./recipes.json";

const prisma = new PrismaClient();

const truncateTables = async () => {
  await Promise.all([
    prisma.appUser.deleteMany(),
    prisma.recipe.deleteMany(),
    prisma.ingredient.deleteMany(),
    prisma.direction.deleteMany(),
    prisma.userFavorites.deleteMany(),
  ]);
};

const createDefaultUser = async () => {
  return prisma.appUser.create({
    data: {
      displayName: "adminGuy123",
    },
  });
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

const createRecipesFromJson = async (user: appUser, recipes: JsonRecipe[]) => {
  return Promise.all(
    recipes.map((r) =>
      prisma.recipe.create({
        data: {
          cookingTime: r.cookingTime,
          course: r.course,
          description:
            r.description ||
            "This is where a description would go...if we HAD one! It would tell you what you can expect from this recipe.",
          difficulty: Number(r.difficulty),
          emoji: r.emoji,
          name: r.name,
          servings: Number(r.servings),
          authorId: user.id,
          directions: {
            create: r.directions.map((d, index) => ({ index, text: d.text })),
          },
          ingredients: {
            create: r.ingredients.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              unit: i.unit,
            })),
          },
        },
      })
    )
  );
};

const dropAndLoad = async () => {
  await truncateTables();
  const user = await createDefaultUser();
  await createRecipesFromJson(user, recipes);
};

const addNewRecipes = async () => {
  const user = await prisma.appUser.findUnique({
    where: { displayName: "John Cooks" },
  });
  if (!user) {
    throw new Error("user not found");
  }

  const existingRecipes = (
    await prisma.recipe.findMany({
      select: { name: true },
    })
  ).map((recipe) => recipe.name);

  const newRecipes = recipes.filter(
    (recipe) => !existingRecipes.includes(recipe.name)
  );
  console.log({ newRecipes: newRecipes.map((recipe) => recipe.name) });

  if (newRecipes.length > 0) {
    const result = await createRecipesFromJson(user, newRecipes);
    console.log({ result });
  }
};

const seed = async () => {
  console.log("seeding started");
  // await dropAndLoad();
  await addNewRecipes();
  console.log("seeding finished");
};

seed();
