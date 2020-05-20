package net.ehicks.recipe.handlers;

import net.ehicks.recipe.beans.Direction;
import net.ehicks.recipe.beans.Ingredient;
import net.ehicks.recipe.beans.MySystem;
import net.ehicks.recipe.beans.Recipe;
import net.ehicks.recipe.repos.MySystemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController
{
    private MySystemRepository mySystemRepo;

    public RecipeController(MySystemRepository mySystemRepo) {
        this.mySystemRepo = mySystemRepo;
    }

    @ModelAttribute("mySystem")
    public MySystem loonSystem()
    {
        return mySystemRepo.findFirstBy();
    }

    @GetMapping("")
    public List<Recipe> get() {
        Recipe recipe = new Recipe();
        recipe.setId(4L);
        recipe.setTitle("Test");
        recipe.setDescription("This is a Test");
        recipe.setCookingTime(5);
        recipe.setDifficulty(2);
        recipe.setIngredients(Arrays.asList(new Ingredient(), new Ingredient()));
        recipe.setDirections(Arrays.asList(new Direction(), new Direction()));
        return new ArrayList<>(Arrays.asList(recipe, recipe));
    }
}