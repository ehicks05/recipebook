package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.ApiException;
import net.hicks.recipe.beans.RecipeBookException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletResponse;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public void catchException(Exception e) {
        System.out.println(e.getLocalizedMessage());
    }

    @ExceptionHandler(RecipeBookException.class)
    public ApiException catchRecipeBookException(RecipeBookException e, HttpServletResponse response) throws Exception {
        System.out.println(e.getLocalizedMessage());

//        return new ResponseEntity<>(e.getClientMessage() + " - " + e.getDetails(), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ApiException(e.getDetails(), HttpStatus.BAD_REQUEST);
//        response.sendError(HttpStatus.BAD_REQUEST.value(), "Username exists, sorry");
    }
}
