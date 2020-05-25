package net.ehicks.recipe.repos;

import net.ehicks.recipe.beans.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long>
{
}