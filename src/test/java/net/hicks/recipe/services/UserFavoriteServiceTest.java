package net.hicks.recipe.services;

import net.hicks.recipe.beans.User;
import net.hicks.recipe.beans.UserFavorite;
import net.hicks.recipe.repos.RecipeRepository;
import net.hicks.recipe.repos.UserFavoriteRepository;
import net.hicks.recipe.utils.TestUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserFavoriteServiceTest {

    @Mock
    private UserFavoriteRepository userFavoriteRepository;

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private UserFavoriteService userFavoriteService;

    @Test
    public void shouldGetUserFavorites() {

        User user = TestUtils.getUser();
        List<UserFavorite> favorites = TestUtils.getUserFavorites();

        when(userFavoriteRepository.findAllByUser(user))
                .thenReturn(favorites);

        List<UserFavorite> favs = userFavoriteService.getUserFavorites(user);

        assertThat(favs.size()).isEqualTo(favorites.size());
        assertThat(favs).isEqualTo(favorites);
        verify(userFavoriteRepository, times(1)).findAllByUser(user);
        verifyNoMoreInteractions(userFavoriteRepository);
    }

    @Test
    public void shouldGetUserFavoriteIds() {

        User user = TestUtils.getUser();
        List<Long> favorites = TestUtils.getUserFavorites().stream().map(UserFavorite::getId).collect(Collectors.toList());

        when(userFavoriteRepository.findAllUserFavoriteIds(user.getId()))
                .thenReturn(favorites);

        List<Long> favs = userFavoriteService.getUserFavoriteIds(user);

        assertThat(favs.size()).isEqualTo(favorites.size());
        assertThat(favs).isEqualTo(favorites);
        verify(userFavoriteRepository, times(1)).findAllUserFavoriteIds(user.getId());
        verifyNoMoreInteractions(userFavoriteRepository);
    }

    @Test
    public void shouldSaveUserFavorite() {
        User user = TestUtils.getUser();
        UserFavorite favorite = TestUtils.getUserFavorites().get(0);

        when(userFavoriteRepository.save(any()))
                .thenReturn(favorite);

        userFavoriteService.saveFavorite(user, favorite.getId());

        verify(userFavoriteRepository, times(1)).save(any());
        verifyNoMoreInteractions(userFavoriteRepository);
    }

}
