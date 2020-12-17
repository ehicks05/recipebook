package net.hicks.recipe.services;


import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.User;
import net.hicks.recipe.config.RecipeBookException;
import net.hicks.recipe.repos.DirectionRepository;
import net.hicks.recipe.repos.IngredientRepository;
import net.hicks.recipe.repos.RecipeRepository;
import net.hicks.recipe.repos.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static net.hicks.recipe.utils.TestUtils.getTacoRecipe;
import static net.hicks.recipe.utils.TestUtils.getTacoRecipeOptional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepository;
    @Mock
    private DirectionRepository directionRepository;
    @Mock
    private IngredientRepository ingredientRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private RecipeService recipeService;

    @Test
    public void shouldGetAllRecipes() {

        List<Recipe> allRecipes = new ArrayList<>();
        allRecipes.add(getTacoRecipe());

        User anon = new User("", "anonymouse", "", Collections.emptySet());

        when(recipeRepository.findByOrderByIdDesc())
                .thenReturn(allRecipes);
        when(userRepository.getUserOrSystemUser(0L))
                .thenReturn(anon);

        List<Recipe> recipes = recipeService.getAllRecipes();

        verify(recipeRepository, times(1)).findByOrderByIdDesc();
        verify(userRepository, times(1)).getUserOrSystemUser(0L);
        assertThat(recipes).isNotNull();
        assertThat(recipes.size()).isGreaterThan(0);
        verifyNoMoreInteractions(recipeRepository);
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void getAllRecipesException() {
        when(recipeRepository.findByOrderByIdDesc())
                .thenThrow(new RuntimeException());

        assertThatExceptionOfType(RecipeBookException.class)
                .isThrownBy(() -> recipeService.getAllRecipes())
                .withMessageContaining("Unable to retrieve recipes");

        verify(recipeRepository, times(1)).findByOrderByIdDesc();
        verifyNoMoreInteractions(recipeRepository);
    }

    @Test
    public void shouldReturnErrorIfNoRecipeExists() {

        when(recipeRepository.findById(1L))
                .thenThrow(EntityNotFoundException.class);

        assertThatExceptionOfType(RecipeBookException.class)
                .isThrownBy(() -> recipeService.getRecipe(1L))
                .withMessageContaining("Unable to retrieve recipe with id 1");

        verify(recipeRepository, times(1)).findById(1L);
        verifyNoMoreInteractions(recipeRepository);
    }

    @Test
    public void shouldReturnRecipeById() {
        when(recipeRepository.findById(1L))
                .thenReturn(getTacoRecipeOptional());

        Recipe taco = recipeService.getRecipe(1L);

        assertThat(taco).isNotNull();
        assertThat(taco).isEqualToComparingFieldByField(getTacoRecipe());

        verifyNoMoreInteractions(recipeRepository);
    }

    @Test
    public void shouldCreateRecipe() {
        Recipe taco = getTacoRecipe();
        Recipe unsavedTaco = getTacoRecipe();
        unsavedTaco.setId(null);

        when(recipeRepository.save(unsavedTaco))
                .thenReturn(taco);

        Recipe savedTaco = recipeService.createRecipe(unsavedTaco);

        assertThat(savedTaco).isEqualTo(taco);

        verify(recipeRepository, times(1)).save(unsavedTaco);
        verifyNoMoreInteractions(recipeRepository);
    }

    @Test
    public void shouldUpdateRecipe() {
        Recipe modifiedTaco = getTacoRecipe();
        modifiedTaco.setName("Chalupa");
        modifiedTaco.setDifficulty(2);

        when(recipeRepository.save(modifiedTaco))
                .thenReturn(modifiedTaco);

        Recipe savedTaco = recipeService.updateRecipe(modifiedTaco);

        assertThat(savedTaco).isEqualTo(modifiedTaco);

        verify(recipeRepository, times(1)).save(modifiedTaco);
        verifyNoMoreInteractions(recipeRepository);
    }

}
