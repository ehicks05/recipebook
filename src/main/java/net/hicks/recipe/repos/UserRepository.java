package net.hicks.recipe.repos;

import net.hicks.recipe.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>
{
    User findByUsername(String username);
    List<User> findAllByOrderById();
}