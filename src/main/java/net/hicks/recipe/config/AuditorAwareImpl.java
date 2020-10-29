package net.hicks.recipe.config;

import net.hicks.recipe.beans.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        if (SecurityContextHolder.getContext().getAuthentication() == null)
            return Optional.of(0L);

        try {
            User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return Optional.of(user.getId());
        } catch (Exception e) {
            return Optional.of(0L);
        }
    }
}
