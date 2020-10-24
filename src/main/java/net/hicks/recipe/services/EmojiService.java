package net.hicks.recipe.services;

import net.hicks.recipe.beans.Emoji;
import net.hicks.recipe.repos.EmojiRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmojiService {

    private final EmojiRepository repository;

    public EmojiService(EmojiRepository repository) {
        this.repository = repository;
    }

    public Emoji save(Emoji emoji) {
        return repository.save(emoji);
    }

    public List<Emoji> getAllEmojis() {
        return repository.findAll();
    }

}
