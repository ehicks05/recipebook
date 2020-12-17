package net.hicks.recipe.repos;

import net.hicks.recipe.beans.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long>
{
    List<Recipe> findByOrderById();
    List<Recipe> findByOrderByIdDesc();

    @Query(value = "select * from recipe where created_by = ?1", nativeQuery = true)
    List<Recipe> findAllByUserId(long createdby);
}