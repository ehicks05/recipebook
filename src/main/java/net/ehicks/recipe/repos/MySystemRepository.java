package net.ehicks.recipe.repos;

import net.ehicks.recipe.beans.MySystem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MySystemRepository extends JpaRepository<MySystem, Long>
{
    MySystem findFirstBy();
}