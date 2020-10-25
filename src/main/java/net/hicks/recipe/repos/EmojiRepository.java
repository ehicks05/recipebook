package net.hicks.recipe.repos;

import net.hicks.recipe.beans.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmojiRepository extends JpaRepository<Emoji, String> {

}
