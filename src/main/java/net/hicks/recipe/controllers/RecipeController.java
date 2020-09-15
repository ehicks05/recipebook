package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.services.RecipeService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController
{
    private final RecipeService recipeService;

    @Value("${recipeBook.recipeFile}")
    public String recipesFile;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{recipeId}")
    public Recipe getRecipe(@PathVariable int recipeId) {
        return recipeService.getRecipe(recipeId);
    }

    @PostMapping
    public void createRecipe(@RequestBody Recipe recipe) {
        recipeService.createRecipe(recipe);
    }

    @PutMapping("/{id}")
    public void updateRecipe(@PathVariable int recipeId, @RequestBody Recipe recipe) {
        recipe.setId(Long.valueOf(recipeId));
        recipeService.updateRecipe(recipe);
    }
}