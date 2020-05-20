package net.ehicks.recipe.handlers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ehicks.recipe.beans.MySystem;
import net.ehicks.recipe.beans.Recipe;
import net.ehicks.recipe.repos.MySystemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController
{
    private static final Logger log = LoggerFactory.getLogger(RecipeController.class);
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
        try
        {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Recipe> recipes = objectMapper.readValue(new File("c:\\projects\\RecipeBook\\src\\main\\resources\\recipes.json"), new TypeReference<List<Recipe>>(){});
            return recipes;
        }
        catch (Exception e)
        {
            log.error(e.getLocalizedMessage(), e);
        }

        return null;
    }
}