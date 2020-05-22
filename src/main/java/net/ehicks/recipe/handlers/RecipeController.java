package net.ehicks.recipe.handlers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ehicks.recipe.beans.Recipe;
import net.ehicks.recipe.repos.DirectionRepository;
import net.ehicks.recipe.repos.IngredientRepository;
import net.ehicks.recipe.repos.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController
{
    private static final Logger log = LoggerFactory.getLogger(RecipeController.class);
    private RecipeRepository recipeRepository;
    private DirectionRepository directionRepository;
    private IngredientRepository ingredientRepository;

    public RecipeController(RecipeRepository recipeRepository, DirectionRepository directionRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.directionRepository = directionRepository;
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping("")
    public List<Recipe> get() {
        try
        {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Recipe> recipes = objectMapper.readValue(new File("c:\\projects\\RecipeBook\\src\\main\\resources\\recipes.json"), new TypeReference<>(){});

            if (recipeRepository.count() == 0)
            {
                recipes.forEach(recipe -> {
                    directionRepository.saveAll(recipe.getDirections());
                    ingredientRepository.saveAll(recipe.getIngredients());
                });
                recipeRepository.saveAll(recipes);
            }

            return recipeRepository.findAll();
        }
        catch (Exception e)
        {
            log.error(e.getLocalizedMessage(), e);
        }

        return null;
    }
}