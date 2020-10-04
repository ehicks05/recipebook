package net.hicks.recipe.security;

import net.hicks.recipe.beans.RecipeBookException;
import net.hicks.recipe.beans.User;
import net.hicks.recipe.beans.UserDetail;
import net.hicks.recipe.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserRepositoryUserDetailsService implements UserDetailsService
{
    final private UserRepository userRepo;
    final private PasswordEncoder passwordEncoder;

    @Autowired
    public UserRepositoryUserDetailsService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        if (userRepo.findByUsername(username) != null) {
            return userRepo.findByUsername(username);
        }
        
        throw new UsernameNotFoundException("User '" + username + "' not found");
    }

    public User saveNewUser(User newUser) {
        String encryptedPassword = passwordEncoder.encoder().encode(newUser.getPassword());

        newUser.setPassword(encryptedPassword);

//        UserDetail userDetail = new UserDetail();
//        userDetail.setUser(newUser);
//        newUser.setUserDetail(userDetail);

        try {
            userRepo.save(newUser);
        } catch (Exception e) {
            System.out.println(e);
            if (e instanceof DataIntegrityViolationException)
                throw new RecipeBookException(30, "Username exists");
        }
        return newUser;
    }
}