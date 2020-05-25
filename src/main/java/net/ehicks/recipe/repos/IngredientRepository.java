package net.ehicks.recipe.repos;

import net.ehicks.recipe.beans.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>
{
}