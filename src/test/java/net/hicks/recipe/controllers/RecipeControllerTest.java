package net.hicks.recipe.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.hicks.recipe.beans.Recipe;
import net.hicks.recipe.beans.RecipeBookException;
import net.hicks.recipe.security.UserRepositoryUserDetailsService;
import net.hicks.recipe.services.RecipeService;
import net.hicks.recipe.utils.TestUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(
        controllers = RecipeController.class)
public class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RecipeService recipeService;

    @MockBean
    private UserRepositoryUserDetailsService userDetailsService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    public void shouldCallGetAllRecipes() throws Exception {
        mockMvc.perform(get("/recipe")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldCallGetAllRecipesAndThrowError() throws Exception {
        RecipeBookException e = new RecipeBookException(10, "", HttpStatus.INTERNAL_SERVER_ERROR);

        when(recipeService.getAllRecipes())
                .thenThrow(e);

        mockMvc.perform(get("/recipe")
                .contentType("application/json"))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void shouldCallGetSpecificRecipe() throws Exception {
        mockMvc.perform(get("/recipe/{id}", 1)
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldCallGetSpecificRecipeAndThrowException() throws Exception {
        RecipeBookException e = new RecipeBookException(10, "", HttpStatus.INTERNAL_SERVER_ERROR);
        when(recipeService.getRecipe(anyLong()))
                .thenThrow(e);

        mockMvc.perform(get("/recipe/{id}", 1)
                .contentType("application/json"))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void shouldCallCreateRecipe() throws Exception {
        Recipe taco = TestUtils.getTacoRecipe();

        mockMvc.perform(post("/recipe")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(taco)))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldCallCreateRecipeAndThrowException() throws Exception {
        RecipeBookException e = new RecipeBookException(10, "", HttpStatus.INTERNAL_SERVER_ERROR);

        Recipe taco = TestUtils.getTacoRecipe();

        when(recipeService.createRecipe(any()))
                .thenThrow(e);

        mockMvc.perform(post("/recipe")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(taco)))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void shouldCallUpdateRecipe() throws Exception {
        Recipe taco = TestUtils.getTacoRecipe();

        mockMvc.perform(put("/recipe/{id}", 1)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(taco)))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldCallUpdateRecipeAndThrowException() throws Exception {
        RecipeBookException e = new RecipeBookException(10, "", HttpStatus.INTERNAL_SERVER_ERROR);

        Recipe taco = TestUtils.getTacoRecipe();

        when(recipeService.updateRecipe(any()))
                .thenThrow(e);

        mockMvc.perform(put("/recipe/{id}", 1)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(taco)))
                .andExpect(status().is5xxServerError());
    }
}
