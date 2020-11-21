package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.User;
import net.hicks.recipe.security.UserRepositoryUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/me")
public class MeController
{
    UserRepositoryUserDetailsService userDetailsService;

    @Autowired
    public MeController(UserRepositoryUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping
    public User user(@AuthenticationPrincipal User user) {
        return user;
    }
}