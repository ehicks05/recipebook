package net.hicks.recipe.repos;

import net.hicks.recipe.beans.User;
import net.hicks.recipe.beans.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {

    List<UserFavorite> findAllByUser(User user);

    @Query(value = "SELECT recipe_id FROM USER_FAVORITES uf where uf.user_id = ?1", nativeQuery = true)
    List<Long> findAllUserFavoriteIds(Long id);

    @Modifying
    @Query(value = "DELETE FROM USER_FAVORITES uf where uf.user_id = ?1 and uf.recipe_id = ?2", nativeQuery = true)
    void deleteAllByRecipIdAndUserId(long userId, long recipeId);
}
