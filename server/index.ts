import express from "express";
import cors from "cors";
import client from "./edgeDbClient";
import e from "./dbschema/edgeql-js";

const app = express();

app.use(cors());

app.get("/api/recipes", async (req, res) => {
  const query = e.select(e.Recipe, (recipe) => ({
    ...e.Recipe["*"],
    test: e.count(recipe.ingredients),
    author: { ...e.User["*"] },
    ingredients: { ...e.Ingredient["*"] },
    steps: { i: true, text: true },
    order_by: {
      expression: recipe.createdAt,
      direction: e.DESC,
      empty: e.EMPTY_LAST,
    },
  }));
  const data = await query.run(client);

  res.json(data);
});

app.get("/api/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const query = e.select(e.Recipe, (recipe) => ({
    filter: e.op(recipe.id, "=", e.uuid(recipeId)),

    ...e.Recipe["*"],
    test: e.count(recipe.ingredients),
    author: { ...e.User["*"] },
    ingredients: { ...e.Ingredient["*"] },
    steps: { i: true, text: true },

    order_by: {
      expression: recipe.createdAt,
      direction: e.DESC,
      empty: e.EMPTY_LAST,
    },
  }));
  const data = await query.run(client);
  res.json(data);
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

const port = 8989;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
