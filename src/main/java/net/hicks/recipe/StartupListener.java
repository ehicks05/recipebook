package net.hicks.recipe;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class StartupListener implements ApplicationListener<ContextRefreshedEvent>
{
    private static final Logger log = LoggerFactory.getLogger(StartupListener.class);

    @Value("${recipeBook.seedDbIfEmpty:false}")
    public String seedDbIfEmpty;

    private final Seeder seeder;

    public StartupListener(Seeder seeder)
    {
        this.seeder = seeder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event)
    {
        log.info("Recipe Book starting...");
        seeder.seed(seedDbIfEmpty.toLowerCase().equals("true"));
    }
}
