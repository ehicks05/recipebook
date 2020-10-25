package net.hicks.recipe.controllers;

import net.hicks.recipe.beans.Emoji;
import net.hicks.recipe.services.EmojiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/emoji")
public class EmojiController {

    private EmojiService emojiService;

    public EmojiController(EmojiService service) {
        this.emojiService = service;
    }

    @GetMapping
    public List<Emoji> getEmojis() {
        return emojiService.getAllEmojis();
    }

}
