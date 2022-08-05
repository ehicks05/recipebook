/* eslint-disable prettier/prettier */
// import { PrismaClient } from '@prisma/client';
import express from "express";
import prisma from "./prismaClient";
import logger from "./config/logger";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/recipes", async (req, res) => {
  logger.info("Hell yea");
  const allRecipes = await prisma.recipe.findMany({
    include: {
      author: true,
      directions: true,
      ingredients: true,
      userFavorites: true,
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(allRecipes);
});

app.get("/api/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  logger.info(`Fetching recipe for ${recipeId}`);
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: {
      author: true,
      directions: true,
      ingredients: true,
      userFavorites: true,
    },
  });
  res.json(recipe);
});

app.put("/api/recipes/{recipeId}", (req, res) => {
  res.json({ message: "test" });
});

app.post("/api/recipes", (req, res) => {
  res.json({ message: "test" });
});

app.get("/api/user/recipes", (req, res) => {
  res.json({ message: "test" });
});

app.get("/api/user/favorites", (req, res) => {
  res.json({ message: "test" });
});

app.listen(8989, () => {
  console.log("Server started");
});
