package net.hicks.recipe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Configuration
public class DateTimeProviderUTC {
    @Bean
    public DateTimeProvider dateTimeProviderUtc() {
        return () -> Optional.of(LocalDateTime.now(ZoneOffset.UTC));
    }
}
