package net.ehicks.recipe.handlers;

import net.ehicks.recipe.beans.MySystem;
import net.ehicks.recipe.repos.MySystemRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/login")
public class LoginController
{
    private MySystemRepository mySystemRepo;

    public LoginController(MySystemRepository mySystemRepo) {
        this.mySystemRepo = mySystemRepo;
    }

    @ModelAttribute("mySystem")
    public MySystem loonSystem()
    {
        return mySystemRepo.findFirstBy();
    }

    @GetMapping
    public ModelAndView loginForm(@RequestParam(required = false) String error) {
        ModelAndView mav = new ModelAndView("login");
        if (error != null) {
            mav.addObject("error", "Invalid username and password!");
        }
        return mav;
    }
}