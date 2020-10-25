package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.User;
import net.hicks.recipe.services.RecipeService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController
{
    private final RecipeService recipeService;

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
    public Recipe createRecipe(@AuthenticationPrincipal User user, @RequestBody Recipe recipe) {
        recipe.setAuthor(user);
        return recipeService.createRecipe(recipe);
    }

    @PutMapping("/{recipeId}")
    public void updateRecipe(@PathVariable int recipeId, @RequestBody Recipe recipe) {
        recipe.setId((long) recipeId);
        recipeService.updateRecipe(recipe);
    }
}