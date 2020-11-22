package net.hicks.recipe.controllers;

import net.hicks.recipe.config.RecipeBookException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> catchException(Exception e) {
        System.out.println(e.getLocalizedMessage());
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RecipeBookException.class)
    public ResponseEntity<String> catchRecipeBookException(RecipeBookException e) {
        System.out.println(e.getLocalizedMessage());
        return new ResponseEntity<>(e.getDetails(), e.getStatus());
    }
}
