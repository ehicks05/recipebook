package net.hicks.recipe.services;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.RecipeBookException;
import net.hicks.recipe.repos.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    private static final Logger log = LoggerFactory.getLogger(RecipeService.class);

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        try
        {
            return recipeRepository.findByOrderById();
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

    public Recipe updateRecipe(Recipe recipeToUpdate) {
        //todo may need checks before updating
        return recipeRepository.save(recipeToUpdate);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }
}
