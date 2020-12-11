package net.hicks.recipe.services;

import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.User;
import net.hicks.recipe.beans.UserFavorite;
import net.hicks.recipe.repos.RecipeRepository;
import net.hicks.recipe.repos.UserFavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserFavoriteService {

    private final UserFavoriteRepository userFavoriteRepository;
    private final RecipeRepository recipeRepository;

    public UserFavoriteService(UserFavoriteRepository userFavoriteRepository, RecipeRepository recipeRepository) {
        this.userFavoriteRepository = userFavoriteRepository;
        this.recipeRepository = recipeRepository;
    }

    public List<UserFavorite> getUserFavorites(User user) {
        List<UserFavorite> favorites = userFavoriteRepository.findAllByUser(user);
        favorites.forEach(fav -> {
            fav.getRecipe().setAuthor(fav.getUser());
        });

        return favorites;
    }

    public List<Long> getUserFavoriteIds(User user) {
        return userFavoriteRepository.findAllUserFavoriteIds(user.getId());
    }

    public void saveFavorite(User user, long recipeId) {
        Recipe recipe = recipeRepository.getOne(recipeId);
        UserFavorite favorite = new UserFavorite(user, recipe);
        userFavoriteRepository.save(favorite);
    }

    @Transactional
    public void removeFavorite(User user, long recipeId) {
        userFavoriteRepository.deleteAllByRecipIdAndUserId(user.getId(), recipeId);
    }

}
