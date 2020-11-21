package net.hicks.recipe.repos;

import net.hicks.recipe.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collections;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>
{
    User findByUsername(String username);

    default User getUserOrSystemUser(Long id) {

        if (this.existsById(id))
            return findById(id).get();

        return new User("", "anonymous", "", "", "", Collections.emptySet());
    }
}