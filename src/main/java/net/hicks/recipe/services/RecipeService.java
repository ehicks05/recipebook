package net.hicks.recipe.services;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.RecipeBookException;
import net.hicks.recipe.repos.DirectionRepository;
import net.hicks.recipe.repos.IngredientRepository;
import net.hicks.recipe.repos.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final DirectionRepository directionRepository;
    private final IngredientRepository ingredientRepository;

    private static final Logger log = LoggerFactory.getLogger(RecipeService.class);

    public RecipeService(RecipeRepository recipeRepository, DirectionRepository directionRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.directionRepository = directionRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<Recipe> getAllRecipes() {
        try
        {
            return recipeRepository.findAll();
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
