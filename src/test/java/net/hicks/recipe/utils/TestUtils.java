package net.hicks.recipe.utils;

import net.hicks.recipe.beans.Direction;
import net.hicks.recipe.beans.Ingredient;
import net.hicks.recipe.beans.Recipe;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TestUtils {

    public static List<Ingredient> getTacoIngredients() {
        List<Ingredient> ingredients = new ArrayList<>();

        Ingredient shells = new Ingredient();
        shells.setId(1L);
        shells.setName("Taco Shells");
        shells.setQuantity("2");
        shells.setUnit("shell");

        Ingredient meat = new Ingredient();
        meat.setId(2L);
        meat.setName("ground beef");
        meat.setQuantity("1");
        meat.setUnit("cup");

        Ingredient cheese = new Ingredient();
        cheese.setId(3L);
        cheese.setName("shredded cheese");
        cheese.setQuantity("1/2");
        cheese.setUnit("cup");

        ingredients.add(shells);
        ingredients.add(meat);
        ingredients.add(cheese);

        return ingredients;
    }

    public static List<Direction> getTacoDirections() {
        List<Direction> directions = new ArrayList<>();

        Direction step1 = new Direction();
        step1.setId(1L);
        step1.setText("Fill shells with ground beef");

        Direction step2 = new Direction();
        step2.setId(2L);
        step2.setText("Fill shells with cheese");

        directions.add(step1);
        directions.add(step2);

        return directions;
    }

    public static Recipe getTacoRecipe() {
        Recipe taco = new Recipe();
        taco.setId(1L);
        taco.setCookingTime("5 minutes");
        taco.setDescription("Tacos");
        taco.setDifficulty(1);
        taco.setName("Taco");
        taco.setServings(1);
        taco.setEmoji("");
        taco.setDirections(getTacoDirections());
        taco.setIngredients(getTacoIngredients());
        taco.setCreatedBy(0L);

        return taco;
    }

    public static Optional<Recipe> getTacoRecipeOptional() {
        return Optional.of(getTacoRecipe());
    }

}
