package net.hicks.recipe.repos;

import net.hicks.recipe.beans.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStateRepository extends JpaRepository<UserDetail, Long>
{
}