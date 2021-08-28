package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.User;
import net.hicks.recipe.beans.UserFavorite;
import net.hicks.recipe.config.RecipeBookException;
import net.hicks.recipe.services.RecipeService;
import net.hicks.recipe.services.UserFavoriteService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController
{
    private final RecipeService recipeService;
    private final UserFavoriteService userFavoriteService;

    public RecipeController(
            RecipeService recipeService,
            UserFavoriteService userFavoriteService
    ) {
        this.recipeService = recipeService;
        this.userFavoriteService = userFavoriteService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/user")
    public List<Recipe> getRecipesForUser(@AuthenticationPrincipal User user) {
        return recipeService.getRecipesForUser(user);
    }

    @GetMapping("/favorites")
    public List<UserFavorite> getFavoriteRecipes(@AuthenticationPrincipal User user) {
        return userFavoriteService.getUserFavorites(user);
    }

    @GetMapping("/favoriteIds")
    public List<Long> getFavoriteRecipeIds(@AuthenticationPrincipal User user) {
        return userFavoriteService.getUserFavoriteIds(user);
    }

    @PostMapping("/favorite/{recipeId}")
    public void saveFavorite(@AuthenticationPrincipal User user, @PathVariable long recipeId) {
        userFavoriteService.saveFavorite(user, recipeId);
    }

    @DeleteMapping("/favorite/{recipeId}")
    public void deleteFavorite(@AuthenticationPrincipal User user, @PathVariable long recipeId) {
        userFavoriteService.removeFavorite(user, recipeId);
    }

    @GetMapping("/{recipeId}")
    public Recipe getRecipe(@PathVariable int recipeId) {
        return recipeService.getRecipe(recipeId);
    }

    @PostMapping
    public Recipe createRecipe(@AuthenticationPrincipal User user, @RequestBody Recipe recipe) {
        return recipeService.createRecipe(user, recipe);
    }

    @PutMapping("/{recipeId}")
    public Recipe updateRecipe(@AuthenticationPrincipal User user, @PathVariable long recipeId, @RequestBody Recipe updatedRecipe) {
        Recipe existingRecipe = recipeService.getRecipe(recipeId);
        if (existingRecipe == null || !existingRecipe.getAuthor().equals(user))
            throw new RecipeBookException(10, "Unable to find recipe to update");
        updatedRecipe.setId(recipeId);
        return recipeService.updateRecipe(updatedRecipe);
    }
}