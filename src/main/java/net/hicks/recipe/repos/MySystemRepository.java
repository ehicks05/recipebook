package net.hicks.recipe.repos;

import net.hicks.recipe.beans.MySystem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MySystemRepository extends JpaRepository<MySystem, Long>
{
    MySystem findFirstBy();
}