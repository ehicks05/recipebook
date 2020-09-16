package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController
{
    @GetMapping
    public User user(@AuthenticationPrincipal User user) {
        return user;
    }
}