package net.ehicks.recipe.repos;

import net.ehicks.recipe.beans.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStateRepository extends JpaRepository<UserDetail, Long>
{
}