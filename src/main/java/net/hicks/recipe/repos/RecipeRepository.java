package net.hicks.recipe.repos;

import net.hicks.recipe.beans.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long>
{
    List<Recipe> findByOrderById();
}