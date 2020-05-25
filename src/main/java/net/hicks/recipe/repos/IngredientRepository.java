package net.hicks.recipe.repos;

import net.hicks.recipe.beans.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>
{
}