import { Router } from 'express';
import { AppError } from '..';
import logger from '../config/logger';
import recipeService from '../recipeService';
import { acceptToken, isAdmin } from '../utils';

const router = Router();

router.get('/recipes', async (req, res, next) => {
  try {
    const allRecipes = await recipeService.getAll();
    res.json(allRecipes);
  } catch (e: any) {
    next(e);
  }
});

router.get('/recipes/:recipeId', async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    logger.info(`Fetching recipe for ${recipeId}`);
    const recipe = await recipeService.getOne(recipeId);
    res.json(recipe);
  } catch (e: any) {
    next(e);
  }
});

router.put('/recipes/:recipeId', async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const user = await acceptToken(req.headers);

    if (!user) {
      throw new AppError(401, 'Only logged in users can create a recipe');
    }

    const recipe = req.body;
    const updatedRecipe = await recipeService.updateRecipe(user.sub, recipeId, recipe);

    res.json(updatedRecipe);
  } catch (e: any) {
    console.log(e);
    next(e);
  }
});

router.post('/recipe', async (req, res, next) => {
  try {
    const user = await acceptToken(req.headers);

    if (!user) {
      logger.error(`Unauthenticated user tried to create a recipe`);
      throw new AppError(401, 'Only logged in users can create a recipe');
    }

    const recipe = req.body;
    const newRecipe = await recipeService.createRecipe(user.sub, recipe);

    res.json(newRecipe);
  } catch (e: any) {
    next(e);
  }
});

router.delete('/recipes/:recipeId', async (req, res, next) => {
  try {
    const user = await acceptToken(req.headers);

    if (!user || !isAdmin(user.email)) {
      logger.error('Unauthenticated user tried to delete a recipe');
      throw new AppError(401, 'Only logged in users can delete a recipe');
    }

    const recipeId = req.params.recipeId;

    const result = await recipeService.deleteRecipe(recipeId);
    res.json(result);
  } catch (e: any) {
    next(e);
  }
});

router.get('/user/recipes', async (req, res, next) => {
  try {
    const user = await acceptToken(req.headers);

    if (!user || user == null) {
      res.json([]);
      return;
    }

    const recipes = await recipeService.getUserRecipes(user.sub);

    res.json(recipes);
  } catch (e: any) {
    next(e);
  }
});

router.get('/user/favorites', async (req, res, next) => {
  try {
    const user = await acceptToken(req.headers);

    if (!user || user == null) {
      res.json([]);
      return;
    }

    const recipes = await recipeService.getUserFavorites(user.sub);
    res.json(recipes);
  } catch (e: any) {
    next(e);
  }
});

router.post('/user/favorites', async (req, res, next) => {
  try {
    const user = await acceptToken(req.headers);

    if (!user || user == null) {
      res.json([]);
      return;
    }

    const thing = req.body;

    const result = await recipeService.addUserFavorite(user.sub, thing);
    res.json(result);
  } catch (e: any) {
    next(e);
  }
});

export default router;
