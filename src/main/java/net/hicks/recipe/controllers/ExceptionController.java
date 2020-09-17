package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.RecipeBookException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public void catchException(Exception e) {
        System.out.println(e);
    }

    @ExceptionHandler(RecipeBookException.class)
    public ResponseEntity<String> catchRecipeBookException(RecipeBookException e) {
        System.out.println(e);

        return new ResponseEntity<String>(e.getClientMessage() + " - " + e.getDetails(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
