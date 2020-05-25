package net.hicks.recipe.repos;

import net.hicks.recipe.beans.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectionRepository extends JpaRepository<Direction, Long>
{
}