package net.hicks.recipe.services;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.User;
import net.hicks.recipe.config.RecipeBookException;
import net.hicks.recipe.repos.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    private static final Logger log = LoggerFactory.getLogger(RecipeService.class);

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        try
        {
            return recipeRepository.findByOrderByIdDesc();
        }
        catch (Exception e)
        {
            log.error(e.getLocalizedMessage(), e);
            throw new RecipeBookException(10, "Unable to retrieve recipes", e);
        }
    }

    public Recipe getRecipe(long recipeId) {
        try {
            return recipeRepository.findById(recipeId).get();
        } catch (Exception e) {
            log.error(e.getLocalizedMessage(), e);
            throw new RecipeBookException(10, "Unable to retrieve recipe with id " + recipeId);
        }
    }

    public List<Recipe> getRecipesForUser(User user) {
        try {
            return recipeRepository.findByAuthor(user);
        } catch (Exception e) {
            log.error(e.getLocalizedMessage(), e);
            throw new RecipeBookException(10, "Unable to retrieve user recipe ids for user " + user.getId());
        }
    }

    public Recipe updateRecipe(Recipe recipeToUpdate) {
        //todo may need checks before updating
        return recipeRepository.save(recipeToUpdate);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> createRecipes(List<Recipe> recipes) {
        return recipeRepository.saveAll(recipes);
    }
}
