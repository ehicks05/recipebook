import { ingredient, direction, recipe, userFavorites } from '@prisma/client';
import { AppError } from '.';
import logger from './config/logger';
import prisma from './prismaClient';

interface IRecipeType extends recipe {
  directions?: direction[];
  ingredients?: ingredient[];
  userFavorites?: userFavorites[];
}

const recipeService = {
  async getAll(): Promise<IRecipeType[]> {
    const allRecipes = await prisma.recipe.findMany({
      include: {
        author: true,
        directions: true,
        ingredients: true,
        userFavorites: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return allRecipes;
  },

  async getOne(recipeId: string): Promise<IRecipeType> {
    const recipe = await prisma.recipe.findUnique({
      include: {
        author: true,
        directions: true,
        ingredients: true,
        userFavorites: true,
      },
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      logger.error(`No recipe found for recipeId=${recipeId}`);
      throw new AppError(400, 'Unable to find recipe');
    }

    return recipe;
  },

  async updateRecipe(userId: string, recipeId: string, recipe: IRecipeType): Promise<IRecipeType> {
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!existingRecipe || existingRecipe.authorId !== userId) {
      logger.error(`UserId=${userId} tried to update un-Authored recipeId=${recipeId}`);
      throw new AppError(400, 'Unable to update recipe');
    }

    const [ingredientDeletes, directionDeletes, updatedRecipe] = await prisma.$transaction([
      prisma.ingredient.deleteMany({
        where: {
          recipeId: existingRecipe.id,
        },
      }),
      prisma.direction.deleteMany({
        where: {
          recipeId: existingRecipe.id,
        },
      }),
      prisma.recipe.update({
        include: {
          author: true,
          directions: true,
          ingredients: true,
          userFavorites: true,
        },
        where: {
          id: existingRecipe.id,
        },
        data: {
          cookingTime: recipe.cookingTime,
          course: recipe.course,
          description: recipe.description,
          difficulty: recipe.difficulty,
          emoji: recipe.emoji,
          name: recipe.name,
          servings: recipe.servings,
          directions: {
            createMany: {
              data:
                recipe?.directions?.map((dir: direction) => ({
                  index: dir.index,
                  text: dir.text,
                })) || [],
            },
          },
          ingredients: {
            createMany: {
              data:
                recipe?.ingredients?.map((ing: ingredient) => ({
                  name: ing.name,
                  quantity: ing.quantity,
                  unit: ing.unit,
                })) || [],
            },
          },
        },
      }),
    ]);

    return updatedRecipe;
  },

  async createRecipe(userId: string, recipe: IRecipeType): Promise<IRecipeType> {
    const directionCreate = recipe.directions
      ? recipe.directions?.map((direction) => {
          return {
            index: direction.index,
            text: direction.text,
          };
        })
      : [];

    const ingredientCreate = recipe.ingredients
      ? recipe.ingredients.map((ingredient) => {
          return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          };
        })
      : [];

    const result = await prisma.recipe.create({
      include: {
        author: true,
        directions: true,
        ingredients: true,
        userFavorites: true,
      },
      data: {
        cookingTime: recipe.cookingTime,
        course: recipe.course,
        description: recipe.description,
        difficulty: recipe.difficulty,
        emoji: recipe.emoji,
        name: recipe.name,
        servings: recipe.servings,
        author: {
          connect: {
            id: userId,
          },
        },
        directions: {
          createMany: {
            data: directionCreate,
          },
        },
        ingredients: {
          createMany: {
            data: ingredientCreate,
          },
        },
      },
    });

    return result;
  },

  async deleteRecipe(recipeId: string): Promise<string> {
    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    return 'yea';
  },

  async getUserRecipes(userId: string): Promise<IRecipeType[]> {
    const recipes = await prisma.recipe.findMany({
      where: {
        authorId: userId,
      },
    });

    return recipes;
  },

  async getUserFavorites(userId: string): Promise<IRecipeType[]> {
    const favRecipeIds = await prisma.userFavorites.findMany({
      where: {
        userId,
      },
    });

    if (favRecipeIds && favRecipeIds.length > 0) {
      const favorites = await prisma.recipe.findMany({
        where: {
          id: {
            in: favRecipeIds.map((recipe) => recipe.recipeId),
          },
        },
      });

      return favorites;
    }

    return [];
  },

  async addUserFavorite(userId: string, favorite: { userId: string; recipeId: string }): Promise<userFavorites[]> {
    await prisma.userFavorites.create({
      data: favorite,
    });

    return await prisma.userFavorites.findMany({
      where: {
        userId,
      },
    });
  },
};

export default recipeService;
