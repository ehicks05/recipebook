package net.hicks.recipe.security;

import net.hicks.recipe.beans.User;
import net.hicks.recipe.repos.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserRepositoryUserDetailsServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserRepositoryUserDetailsService userDetailsService;

    @Test
    public void shouldLoadUser() {
        User user = new User();
        user.setId(100L);
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("password");
        user.setRoles(new HashSet<>());
        user.setEmail("test@admin.com");

        when(userRepository.findByEmail("test@admin.com"))
                .thenReturn(user);

        UserDetails foundUser = userDetailsService.loadUserByUsername("test@admin.com");

        assertThat(foundUser).isEqualTo(user);

        verify(userRepository, times(1)).findByEmail(anyString());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void shouldThrowMissingUserException() {
        when(userRepository.findByEmail(anyString()))
                .thenReturn(null);

        assertThatThrownBy(() -> userDetailsService.loadUserByUsername("invalidUsername"))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("User 'invalidUsername' not found");

        verify(userRepository, times(1)).findByEmail(anyString());
        verifyNoMoreInteractions(userRepository);
    }
}
