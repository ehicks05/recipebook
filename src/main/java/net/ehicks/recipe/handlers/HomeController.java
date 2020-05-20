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
@RequestMapping("/home")
public class HomeController
{
    private MySystemRepository mySystemRepo;

    public HomeController(MySystemRepository mySystemRepo) {
        this.mySystemRepo = mySystemRepo;
    }

    @ModelAttribute("mySystem")
    public MySystem loonSystem()
    {
        return mySystemRepo.findFirstBy();
    }

    @GetMapping
    public ModelAndView homeForm() {
        return new ModelAndView("index");
    }
}