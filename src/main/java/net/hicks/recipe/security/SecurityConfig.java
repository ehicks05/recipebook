package net.hicks.recipe.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserRepositoryUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(UserRepositoryUserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }

    @Configuration
    @Order(99)
    public static class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .cors(withDefaults())
                    .authorizeRequests()
                    .antMatchers("/", "/login/**", "/recipe/**", "/register", "/images/**", "/js/**", "/styles/**", "/robots.txt", "/actuator/**", "/favicon.ico").permitAll()
                    .antMatchers("/admin/**", "/api/**").hasRole("ADMIN")
                    .antMatchers("/user").hasRole("USER")
                    .and()
                    .formLogin()
                    .usernameParameter("email")
                    .successHandler((request, response, authentication) -> {
//                        do nothing
                    })
                    .and()
                    .exceptionHandling()
                    .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                    .and()
                    .logout()
                    .and().csrf().disable();
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("https://hicks-recipes.netlify.app", "http://localhost:8084/", "https://hicks-recipe-book.herokuapp.com/", "https://hicks-recipes.netlify.app"));
        configuration.setAllowedMethods(List.of("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH"));
        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);
        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Set-Cookie"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    @Configuration
//    @Order(1)
//    public static class ApiSecurityConfig extends WebSecurityConfigurerAdapter
//    {
//        @Override
//        protected void configure(HttpSecurity http) throws Exception
//        {
//            http    .cors().and()
//                    .csrf().disable()
//                    .antMatcher("/actuator/**")
//                    .authorizeRequests(authorize -> authorize
//                            .anyRequest().hasRole("ADMIN")
//                    )
//                    .httpBasic(withDefaults());
//
//            http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        }
//    }
}


//        2020-11-14 13:36:04.448 DEBUG 18060 --- [nio-8084-exec-5] o.s.security.web.FilterChainProxy        : /login at position 1 of 12 in additional filter chain; firing Filter: 'WebAsyncManagerIntegrationFilter'
//        2020-11-14 13:36:04.448 DEBUG 18060 --- [nio-8084-exec-5] o.s.security.web.FilterChainProxy        : /login at position 2 of 12 in additional filter chain; firing Filter: 'SecurityContextPersistenceFilter'
//        2020-11-14 13:36:04.448 DEBUG 18060 --- [nio-8084-exec-5] w.c.HttpSessionSecurityContextRepository : No HttpSession currently exists
//        2020-11-14 13:36:04.448 DEBUG 18060 --- [nio-8084-exec-5] w.c.HttpSessionSecurityContextRepository : No SecurityContext was available from the HttpSession: null. A new one will be created.
//        2020-11-14 13:36:04.448 DEBUG 18060 --- [nio-8084-exec-5] o.s.security.web.FilterChainProxy        : /login at position 3 of 12 in additional filter chain; firing Filter: 'HeaderWriterFilter'
//        2020-11-14 13:36:04.448 DEBUG 18060 --- [nio-8084-exec-5] o.s.security.web.FilterChainProxy        : /login at position 4 of 12 in additional filter chain; firing Filter: 'CorsFilter'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.security.web.FilterChainProxy        : /login at position 5 of 12 in additional filter chain; firing Filter: 'LogoutFilter'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', GET]
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'POST /login' doesn't match 'GET /logout'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', POST]
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/login'; against '/logout'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', PUT]
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'POST /login' doesn't match 'PUT /logout'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', DELETE]
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'POST /login' doesn't match 'DELETE /logout'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.web.util.matcher.OrRequestMatcher  : No matches found
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.security.web.FilterChainProxy        : /login at position 6 of 12 in additional filter chain; firing Filter: 'UsernamePasswordAuthenticationFilter'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/login'; against '/login'
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] w.a.UsernamePasswordAuthenticationFilter : Request is to process authentication
//        2020-11-14 13:36:04.449 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.authentication.ProviderManager     : Authentication attempt using org.springframework.security.authentication.dao.DaoAuthenticationProvider
//        2020-11-14 13:36:04.449  INFO 18060 --- [nio-8084-exec-5] n.h.r.s.UserRepositoryUserDetailsService : called loadUserByUsername
//        2020-11-14 13:36:04.453  INFO 18060 --- [nio-8084-exec-5] n.h.r.s.UserRepositoryUserDetailsService : found user admin@test.com
//        2020-11-14 13:36:04.520 DEBUG 18060 --- [nio-8084-exec-5] s.CompositeSessionAuthenticationStrategy : Delegating to org.springframework.security.web.authentication.session.ChangeSessionIdAuthenticationStrategy@626858ce
//        2020-11-14 13:36:04.520 DEBUG 18060 --- [nio-8084-exec-5] w.a.UsernamePasswordAuthenticationFilter : Authentication success. Updating SecurityContextHolder to contain: org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffff6d9a: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@957e: RemoteIpAddress: 127.0.0.1; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN
//        2020-11-14 13:36:04.520 DEBUG 18060 --- [nio-8084-exec-5] o.s.s.w.header.writers.HstsHeaderWriter  : Not injecting HSTS header since it did not match the requestMatcher org.springframework.security.web.header.writers.HstsHeaderWriter$SecureRequestMatcher@1aa563a1
//        2020-11-14 13:36:04.520 DEBUG 18060 --- [nio-8084-exec-5] w.c.HttpSessionSecurityContextRepository : HttpSession being created as SecurityContext is non-default
//        2020-11-14 13:36:04.520 DEBUG 18060 --- [nio-8084-exec-5] w.c.HttpSessionSecurityContextRepository : SecurityContext 'org.springframework.security.core.context.SecurityContextImpl@ffff6d9a: Authentication: org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffff6d9a: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@957e: RemoteIpAddress: 127.0.0.1; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN' stored to HttpSession: 'org.springframework.session.web.http.SessionRepositoryFilter$SessionRepositoryRequestWrapper$HttpSessionWrapper@6f3a6cce
//        2020-11-14 13:36:04.520 DEBUG 18060 --- [nio-8084-exec-5] s.s.w.c.SecurityContextPersistenceFilter : SecurityContextHolder now cleared, as request processing completed
//        2020-11-14 13:36:04.857 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 1 of 12 in additional filter chain; firing Filter: 'WebAsyncManagerIntegrationFilter'
//        2020-11-14 13:36:04.857 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 2 of 12 in additional filter chain; firing Filter: 'SecurityContextPersistenceFilter'
//        2020-11-14 13:36:04.861 DEBUG 18060 --- [nio-8084-exec-6] w.c.HttpSessionSecurityContextRepository : Obtained a valid SecurityContext from SPRING_SECURITY_CONTEXT: 'org.springframework.security.core.context.SecurityContextImpl@ffff6de5: Authentication: org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffff6de5: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@957e: RemoteIpAddress: 127.0.0.1; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN'
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 3 of 12 in additional filter chain; firing Filter: 'HeaderWriterFilter'
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 4 of 12 in additional filter chain; firing Filter: 'CorsFilter'
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 5 of 12 in additional filter chain; firing Filter: 'LogoutFilter'
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', GET]
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/logout'
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', POST]
//        2020-11-14 13:36:04.862 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'POST /logout'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', PUT]
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'PUT /logout'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', DELETE]
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'DELETE /logout'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.web.util.matcher.OrRequestMatcher  : No matches found
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 6 of 12 in additional filter chain; firing Filter: 'UsernamePasswordAuthenticationFilter'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'POST /login'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 7 of 12 in additional filter chain; firing Filter: 'RequestCacheAwareFilter'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.s.HttpSessionRequestCache        : saved request doesn't match
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 8 of 12 in additional filter chain; firing Filter: 'SecurityContextHolderAwareRequestFilter'
//        2020-11-14 13:36:04.863 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 9 of 12 in additional filter chain; firing Filter: 'AnonymousAuthenticationFilter'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.a.AnonymousAuthenticationFilter  : SecurityContextHolder not populated with anonymous token, as it already contained: 'org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffff6de5: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@957e: RemoteIpAddress: 127.0.0.1; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 10 of 12 in additional filter chain; firing Filter: 'SessionManagementFilter'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 11 of 12 in additional filter chain; firing Filter: 'ExceptionTranslationFilter'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user at position 12 of 12 in additional filter chain; firing Filter: 'FilterSecurityInterceptor'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/login/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/recipe/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/register'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/images/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/js/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/styles/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/robots.txt'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/actuator/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/favicon.ico'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/admin/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/api/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request '/user' matched by universal pattern '/**'
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.a.i.FilterSecurityInterceptor    : Secure object: FilterInvocation: URL: /user; Attributes: [hasRole('ROLE_USER')]
//        2020-11-14 13:36:04.864 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.a.i.FilterSecurityInterceptor    : Previously Authenticated: org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffff6de5: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@957e: RemoteIpAddress: 127.0.0.1; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN
//        2020-11-14 13:36:04.865 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.access.vote.AffirmativeBased       : Voter: org.springframework.security.web.access.expression.WebExpressionVoter@21cd4196, returned: 1
//        2020-11-14 13:36:04.865 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorization successful
//        2020-11-14 13:36:04.865 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.a.i.FilterSecurityInterceptor    : RunAsManager did not change Authentication object
//        2020-11-14 13:36:04.865 DEBUG 18060 --- [nio-8084-exec-6] o.s.security.web.FilterChainProxy        : /user reached end of additional filter chain; proceeding with original chain
//        2020-11-14 13:36:04.867 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.header.writers.HstsHeaderWriter  : Not injecting HSTS header since it did not match the requestMatcher org.springframework.security.web.header.writers.HstsHeaderWriter$SecureRequestMatcher@1aa563a1
//        2020-11-14 13:36:04.873 DEBUG 18060 --- [nio-8084-exec-6] o.s.s.w.a.ExceptionTranslationFilter     : Chain processed normally
//        2020-11-14 13:36:04.873 DEBUG 18060 --- [nio-8084-exec-6] s.s.w.c.SecurityContextPersistenceFilter : SecurityContextHolder now cleared, as request processing completed
