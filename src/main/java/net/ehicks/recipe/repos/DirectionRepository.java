package net.ehicks.recipe.repos;

import net.ehicks.recipe.beans.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectionRepository extends JpaRepository<Direction, Long>
{
}