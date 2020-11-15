package net.hicks.recipe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer
{
    // Allows the handling of input type='datetime-local'
    @Override
    public void addFormatters(FormatterRegistry registry) {
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setUseIsoFormat(true);
        registrar.registerFormatters(registry);
    }

   @Override
   public void addCorsMappings(CorsRegistry registry) {
       registry
               .addMapping("/**")
               .allowedOrigins("*")
               .allowedMethods("*")
//               .allowedHeaders("*")
               .allowCredentials(true);
   }
}












































































//        2020-11-14T19:36:31.385762+00:00 app[web.1]: 2020-11-14 19:36:31.385 DEBUG 4 --- [io-57541-exec-7] o.s.security.web.FilterChainProxy        : /login at position 1 of 12 in additional filter chain; firing Filter: 'WebAsyncManagerIntegrationFilter'
//        2020-11-14T19:36:31.385913+00:00 app[web.1]: 2020-11-14 19:36:31.385 DEBUG 4 --- [io-57541-exec-7] o.s.security.web.FilterChainProxy        : /login at position 2 of 12 in additional filter chain; firing Filter: 'SecurityContextPersistenceFilter'
//        2020-11-14T19:36:31.389215+00:00 app[web.1]: 2020-11-14 19:36:31.389 DEBUG 4 --- [io-57541-exec-7] w.c.HttpSessionSecurityContextRepository : No HttpSession currently exists
//        2020-11-14T19:36:31.389330+00:00 app[web.1]: 2020-11-14 19:36:31.389 DEBUG 4 --- [io-57541-exec-7] w.c.HttpSessionSecurityContextRepository : No SecurityContext was available from the HttpSession: null. A new one will be created.
//        2020-11-14T19:36:31.389685+00:00 app[web.1]: 2020-11-14 19:36:31.389 DEBUG 4 --- [io-57541-exec-7] o.s.security.web.FilterChainProxy        : /login at position 3 of 12 in additional filter chain; firing Filter: 'HeaderWriterFilter'
//        2020-11-14T19:36:31.390017+00:00 app[web.1]: 2020-11-14 19:36:31.389 DEBUG 4 --- [io-57541-exec-7] o.s.security.web.FilterChainProxy        : /login at position 4 of 12 in additional filter chain; firing Filter: 'CorsFilter'
//        2020-11-14T19:36:31.395545+00:00 app[web.1]: 2020-11-14 19:36:31.395 DEBUG 4 --- [io-57541-exec-7] o.s.security.web.FilterChainProxy        : /login at position 5 of 12 in additional filter chain; firing Filter: 'LogoutFilter'
//        2020-11-14T19:36:31.420475+00:00 app[web.1]: 2020-11-14 19:36:31.420 DEBUG 4 --- [io-57541-exec-7] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', GET]
//        2020-11-14T19:36:31.421128+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'POST /login' doesn't match 'GET /logout'
//        2020-11-14T19:36:31.421252+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', POST]
//        2020-11-14T19:36:31.421379+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/login'; against '/logout'
//        2020-11-14T19:36:31.421530+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', PUT]
//        2020-11-14T19:36:31.421634+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'POST /login' doesn't match 'PUT /logout'
//        2020-11-14T19:36:31.421728+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', DELETE]
//        2020-11-14T19:36:31.421853+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'POST /login' doesn't match 'DELETE /logout'
//        2020-11-14T19:36:31.421933+00:00 app[web.1]: 2020-11-14 19:36:31.421 DEBUG 4 --- [io-57541-exec-7] o.s.s.web.util.matcher.OrRequestMatcher  : No matches found
//        2020-11-14T19:36:31.422086+00:00 app[web.1]: 2020-11-14 19:36:31.422 DEBUG 4 --- [io-57541-exec-7] o.s.security.web.FilterChainProxy        : /login at position 6 of 12 in additional filter chain; firing Filter: 'UsernamePasswordAuthenticationFilter'
//        2020-11-14T19:36:31.422277+00:00 app[web.1]: 2020-11-14 19:36:31.422 DEBUG 4 --- [io-57541-exec-7] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/login'; against '/login'
//        2020-11-14T19:36:31.422412+00:00 app[web.1]: 2020-11-14 19:36:31.422 DEBUG 4 --- [io-57541-exec-7] w.a.UsernamePasswordAuthenticationFilter : Request is to process authentication
//        2020-11-14T19:36:31.422760+00:00 app[web.1]: 2020-11-14 19:36:31.422 DEBUG 4 --- [io-57541-exec-7] o.s.s.authentication.ProviderManager     : Authentication attempt using org.springframework.security.authentication.dao.DaoAuthenticationProvider
//        2020-11-14T19:36:31.422885+00:00 app[web.1]: 2020-11-14 19:36:31.422  INFO 4 --- [io-57541-exec-7] n.h.r.s.UserRepositoryUserDetailsService : called loadUserByUsername
//        2020-11-14T19:36:31.438204+00:00 app[web.1]: 2020-11-14 19:36:31.438  INFO 4 --- [io-57541-exec-7] org.hibernate.SQL_SLOW                   : SlowQuery: 11 milliseconds. SQL: 'HikariProxyPreparedStatement@1518277076 wrapping select user0_.id as id1_1_, user0_.added_on as added_on2_1_, user0_.created_by as created_3_1_, user0_.last_updated as last_upd4_1_, user0_.modified_by as modified5_1_, user0_.email as email6_1_, user0_.first_name as first_na7_1_, user0_.last_name as last_nam8_1_, user0_.password as password9_1_, user0_.username as usernam10_1_ from app_user user0_ where user0_.email='admin@test.com''
//        2020-11-14T19:36:31.444624+00:00 app[web.1]: 2020-11-14 19:36:31.444  INFO 4 --- [io-57541-exec-7] n.h.r.s.UserRepositoryUserDetailsService : found user admin@test.com
//        2020-11-14T19:36:31.661884+00:00 app[web.1]: 2020-11-14 19:36:31.661 DEBUG 4 --- [io-57541-exec-7] s.CompositeSessionAuthenticationStrategy : Delegating to org.springframework.security.web.authentication.session.ChangeSessionIdAuthenticationStrategy@451882b2
//        2020-11-14T19:36:31.662090+00:00 app[web.1]: 2020-11-14 19:36:31.662 DEBUG 4 --- [io-57541-exec-7] w.a.UsernamePasswordAuthenticationFilter : Authentication success. Updating SecurityContextHolder to contain: org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffffc328: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@3bcc: RemoteIpAddress: 73.44.67.59; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN
//        2020-11-14T19:36:31.664613+00:00 app[web.1]: 2020-11-14 19:36:31.664 DEBUG 4 --- [io-57541-exec-7] w.c.HttpSessionSecurityContextRepository : HttpSession being created as SecurityContext is non-default
//        2020-11-14T19:36:31.667408+00:00 app[web.1]: 2020-11-14 19:36:31.667 DEBUG 4 --- [io-57541-exec-7] w.c.HttpSessionSecurityContextRepository : SecurityContext 'org.springframework.security.core.context.SecurityContextImpl@ffffc328: Authentication: org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ffffc328: Principal: User:3; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@3bcc: RemoteIpAddress: 73.44.67.59; SessionId: null; Granted Authorities: ROLE_USER, ROLE_ADMIN' stored to HttpSession: 'org.springframework.session.web.http.SessionRepositoryFilter$SessionRepositoryRequestWrapper$HttpSessionWrapper@6fb2506e
//        2020-11-14T19:36:31.667532+00:00 app[web.1]: 2020-11-14 19:36:31.667 DEBUG 4 --- [io-57541-exec-7] s.s.w.c.SecurityContextPersistenceFilter : SecurityContextHolder now cleared, as request processing completed
//        2020-11-14T19:36:31.852631+00:00 app[web.1]: 2020-11-14 19:36:31.852 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 1 of 12 in additional filter chain; firing Filter: 'WebAsyncManagerIntegrationFilter'
//        2020-11-14T19:36:31.852733+00:00 app[web.1]: 2020-11-14 19:36:31.852 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 2 of 12 in additional filter chain; firing Filter: 'SecurityContextPersistenceFilter'
//        2020-11-14T19:36:31.863125+00:00 app[web.1]: 2020-11-14 19:36:31.862 DEBUG 4 --- [io-57541-exec-8] w.c.HttpSessionSecurityContextRepository : HttpSession returned null object for SPRING_SECURITY_CONTEXT
//        2020-11-14T19:36:31.863624+00:00 app[web.1]: 2020-11-14 19:36:31.863 DEBUG 4 --- [io-57541-exec-8] w.c.HttpSessionSecurityContextRepository : No SecurityContext was available from the HttpSession: org.springframework.session.web.http.SessionRepositoryFilter$SessionRepositoryRequestWrapper$HttpSessionWrapper@39cf9004. A new one will be created.
//        2020-11-14T19:36:31.864269+00:00 app[web.1]: 2020-11-14 19:36:31.864 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 3 of 12 in additional filter chain; firing Filter: 'HeaderWriterFilter'
//        2020-11-14T19:36:31.864465+00:00 app[web.1]: 2020-11-14 19:36:31.864 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 4 of 12 in additional filter chain; firing Filter: 'CorsFilter'
//        2020-11-14T19:36:31.871087+00:00 app[web.1]: 2020-11-14 19:36:31.870 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 5 of 12 in additional filter chain; firing Filter: 'LogoutFilter'
//        2020-11-14T19:36:31.871896+00:00 app[web.1]: 2020-11-14 19:36:31.871 DEBUG 4 --- [io-57541-exec-8] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', GET]
//        2020-11-14T19:36:31.889796+00:00 app[web.1]: 2020-11-14 19:36:31.872 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/logout'
//        2020-11-14T19:36:31.889997+00:00 app[web.1]: 2020-11-14 19:36:31.889 DEBUG 4 --- [io-57541-exec-8] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', POST]
//        2020-11-14T19:36:31.893123+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'POST /logout'
//        2020-11-14T19:36:31.893192+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', PUT]
//        2020-11-14T19:36:31.893258+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'PUT /logout'
//        2020-11-14T19:36:31.893312+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.web.util.matcher.OrRequestMatcher  : Trying to match using Ant [pattern='/logout', DELETE]
//        2020-11-14T19:36:31.893376+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'DELETE /logout'
//        2020-11-14T19:36:31.893426+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.web.util.matcher.OrRequestMatcher  : No matches found
//        2020-11-14T19:36:31.893507+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 6 of 12 in additional filter chain; firing Filter: 'UsernamePasswordAuthenticationFilter'
//        2020-11-14T19:36:31.893565+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request 'GET /user' doesn't match 'POST /login'
//        2020-11-14T19:36:31.893639+00:00 app[web.1]: 2020-11-14 19:36:31.893 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 7 of 12 in additional filter chain; firing Filter: 'RequestCacheAwareFilter'
//        2020-11-14T19:36:31.911695+00:00 app[web.1]: 2020-11-14 19:36:31.911 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : pathInfo: both null (property equals)
//        2020-11-14T19:36:31.911773+00:00 app[web.1]: 2020-11-14 19:36:31.911 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : queryString: both null (property equals)
//        2020-11-14T19:36:31.911831+00:00 app[web.1]: 2020-11-14 19:36:31.911 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : requestURI: arg1=/user; arg2=/user (property equals)
//        2020-11-14T19:36:31.911977+00:00 app[web.1]: 2020-11-14 19:36:31.911 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : serverPort: arg1=443; arg2=443 (property equals)
//        2020-11-14T19:36:31.686641+00:00 heroku[router]: at=info method=POST path="/login" host=hicks-recipe-book.herokuapp.com request_id=3685e1c0-04bc-48c4-9f6c-e92c46cc2017 fwd="73.44.67.59" dyno=web.1 connect=1ms service=311ms status=200 bytes=643 protocol=https
//        2020-11-14T19:36:31.916182+00:00 app[web.1]: 2020-11-14 19:36:31.912 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : requestURL: arg1=https://hicks-recipe-book.herokuapp.com/user; arg2=https://hicks-recipe-book.herokuapp.com/user (property equals)
//        2020-11-14T19:36:31.916194+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : scheme: arg1=https; arg2=https (property equals)
//        2020-11-14T19:36:31.916275+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : serverName: arg1=hicks-recipe-book.herokuapp.com; arg2=hicks-recipe-book.herokuapp.com (property equals)
//        2020-11-14T19:36:31.916338+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : contextPath: arg1=; arg2= (property equals)
//        2020-11-14T19:36:31.916388+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.DefaultSavedRequest            : servletPath: arg1=/user; arg2=/user (property equals)
//        2020-11-14T19:36:31.916459+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.HttpSessionRequestCache        : Removing DefaultSavedRequest from session if present
//        2020-11-14T19:36:31.916844+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 8 of 12 in additional filter chain; firing Filter: 'SecurityContextHolderAwareRequestFilter'
//        2020-11-14T19:36:31.916919+00:00 app[web.1]: 2020-11-14 19:36:31.916 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 9 of 12 in additional filter chain; firing Filter: 'AnonymousAuthenticationFilter'
//        2020-11-14T19:36:31.917127+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.a.AnonymousAuthenticationFilter  : Populated SecurityContextHolder with anonymous token: 'org.springframework.security.authentication.AnonymousAuthenticationToken@1a303d0f: Principal: anonymousUser; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@fffe9938: RemoteIpAddress: 73.44.67.59; SessionId: f208f768-f874-4e97-bd1c-e9ee63ed1942; Granted Authorities: ROLE_ANONYMOUS'
//        2020-11-14T19:36:31.917226+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 10 of 12 in additional filter chain; firing Filter: 'SessionManagementFilter'
//        2020-11-14T19:36:31.917326+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 11 of 12 in additional filter chain; firing Filter: 'ExceptionTranslationFilter'
//        2020-11-14T19:36:31.917414+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.security.web.FilterChainProxy        : /user at position 12 of 12 in additional filter chain; firing Filter: 'FilterSecurityInterceptor'
//        2020-11-14T19:36:31.917529+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/'
//        2020-11-14T19:36:31.917615+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/login/**'
//        2020-11-14T19:36:31.917735+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/recipe/**'
//        2020-11-14T19:36:31.917799+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/register'
//        2020-11-14T19:36:31.917874+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/images/**'
//        2020-11-14T19:36:31.917945+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/js/**'
//        2020-11-14T19:36:31.918005+00:00 app[web.1]: 2020-11-14 19:36:31.917 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/styles/**'
//        2020-11-14T19:36:31.918083+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/robots.txt'
//        2020-11-14T19:36:31.918173+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/actuator/**'
//        2020-11-14T19:36:31.918234+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/favicon.ico'
//        2020-11-14T19:36:31.918304+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/admin/**'
//        2020-11-14T19:36:31.918365+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/api/**'
//        2020-11-14T19:36:31.918447+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Request '/user' matched by universal pattern '/**'
//        2020-11-14T19:36:31.918598+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.a.i.FilterSecurityInterceptor    : Secure object: FilterInvocation: URL: /user; Attributes: [hasRole('ROLE_USER')]
//        2020-11-14T19:36:31.918689+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.a.i.FilterSecurityInterceptor    : Previously Authenticated: org.springframework.security.authentication.AnonymousAuthenticationToken@1a303d0f: Principal: anonymousUser; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@fffe9938: RemoteIpAddress: 73.44.67.59; SessionId: f208f768-f874-4e97-bd1c-e9ee63ed1942; Granted Authorities: ROLE_ANONYMOUS
//        2020-11-14T19:36:31.919088+00:00 app[web.1]: 2020-11-14 19:36:31.918 DEBUG 4 --- [io-57541-exec-8] o.s.s.access.vote.AffirmativeBased       : Voter: org.springframework.security.web.access.expression.WebExpressionVoter@36e4fa5a, returned: -1
//        2020-11-14T19:36:31.920782+00:00 app[web.1]: 2020-11-14 19:36:31.920 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.a.ExceptionTranslationFilter     : Access is denied (user is anonymous); redirecting to authentication entry point
//        2020-11-14T19:36:31.920783+00:00 app[web.1]:
//        2020-11-14T19:36:31.920784+00:00 app[web.1]: org.springframework.security.access.AccessDeniedException: Access is denied
//        2020-11-14T19:36:31.920784+00:00 app[web.1]: 	at org.springframework.security.access.vote.AffirmativeBased.decide(AffirmativeBased.java:84) ~[spring-security-core-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920785+00:00 app[web.1]: 	at org.springframework.security.access.intercept.AbstractSecurityInterceptor.beforeInvocation(AbstractSecurityInterceptor.java:233) ~[spring-security-core-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920785+00:00 app[web.1]: 	at org.springframework.security.web.access.intercept.FilterSecurityInterceptor.invoke(FilterSecurityInterceptor.java:123) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920785+00:00 app[web.1]: 	at org.springframework.security.web.access.intercept.FilterSecurityInterceptor.doFilter(FilterSecurityInterceptor.java:90) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920787+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920788+00:00 app[web.1]: 	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:118) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920788+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920789+00:00 app[web.1]: 	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:137) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920789+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920789+00:00 app[web.1]: 	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:111) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920790+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920791+00:00 app[web.1]: 	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:158) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920791+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920791+00:00 app[web.1]: 	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920792+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920792+00:00 app[web.1]: 	at org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:200) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920793+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920793+00:00 app[web.1]: 	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:116) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920794+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920794+00:00 app[web.1]: 	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:92) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920795+00:00 app[web.1]: 	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920795+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920801+00:00 app[web.1]: 	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:92) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920802+00:00 app[web.1]: 	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:77) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920802+00:00 app[web.1]: 	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920803+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920803+00:00 app[web.1]: 	at org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:105) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920804+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920804+00:00 app[web.1]: 	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:56) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920804+00:00 app[web.1]: 	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920805+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920805+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:215) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920806+00:00 app[web.1]: 	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:178) ~[spring-security-web-5.3.4.RELEASE.jar!/:5.3.4.RELEASE]
//        2020-11-14T19:36:31.920807+00:00 app[web.1]: 	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:358) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920807+00:00 app[web.1]: 	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:271) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920808+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920808+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920808+00:00 app[web.1]: 	at org.springframework.session.web.http.SessionRepositoryFilter.doFilterInternal(SessionRepositoryFilter.java:141) ~[spring-session-core-2.3.0.RELEASE.jar!/:2.3.0.RELEASE]
//        2020-11-14T19:36:31.920809+00:00 app[web.1]: 	at org.springframework.session.web.http.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:82) ~[spring-session-core-2.3.0.RELEASE.jar!/:2.3.0.RELEASE]
//        2020-11-14T19:36:31.920809+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920810+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920810+00:00 app[web.1]: 	at org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter.doFilterInternal(WebMvcMetricsFilter.java:93) ~[spring-boot-actuator-2.3.3.RELEASE.jar!/:2.3.3.RELEASE]
//        2020-11-14T19:36:31.920811+00:00 app[web.1]: 	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920811+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920811+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920812+00:00 app[web.1]: 	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920812+00:00 app[web.1]: 	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) ~[spring-web-5.2.8.RELEASE.jar!/:5.2.8.RELEASE]
//        2020-11-14T19:36:31.920813+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920817+00:00 app[web.1]: 	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920818+00:00 app[web.1]: 	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920818+00:00 app[web.1]: 	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920819+00:00 app[web.1]: 	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:541) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920819+00:00 app[web.1]: 	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920819+00:00 app[web.1]: 	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920820+00:00 app[web.1]: 	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920820+00:00 app[web.1]: 	at org.apache.catalina.valves.RemoteIpValve.invoke(RemoteIpValve.java:747) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920821+00:00 app[web.1]: 	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920821+00:00 app[web.1]: 	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:373) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920822+00:00 app[web.1]: 	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920822+00:00 app[web.1]: 	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:868) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920822+00:00 app[web.1]: 	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1589) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920823+00:00 app[web.1]: 	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920823+00:00 app[web.1]: 	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130) ~[na:na]
//        2020-11-14T19:36:31.920824+00:00 app[web.1]: 	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:630) ~[na:na]
//        2020-11-14T19:36:31.920824+00:00 app[web.1]: 	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) ~[tomcat-embed-core-9.0.37.jar!/:9.0.37]
//        2020-11-14T19:36:31.920825+00:00 app[web.1]: 	at java.base/java.lang.Thread.run(Thread.java:832) ~[na:na]
//        2020-11-14T19:36:31.920825+00:00 app[web.1]:
//        2020-11-14T19:36:32.005272+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.util.matcher.AndRequestMatcher   : Trying to match using NegatedRequestMatcher [requestMatcher=Ant [pattern='/**/favicon.*']]
//        2020-11-14T19:36:32.005375+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/user'; against '/**/favicon.*'
//        2020-11-14T19:36:32.005525+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.NegatedRequestMatcher  : matches = true
//        2020-11-14T19:36:32.005632+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.util.matcher.AndRequestMatcher   : Trying to match using NegatedRequestMatcher [requestMatcher=MediaTypeRequestMatcher [contentNegotiationStrategy=org.springframework.web.accept.ContentNegotiationManager@2ab2710, matchingMediaTypes=[application/json], useEquals=false, ignoredMediaTypes=[*/*]]]
//        2020-11-14T19:36:32.005886+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : httpRequestMediaTypes=[*/*]
//        2020-11-14T19:36:32.005956+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Processing */*
//        2020-11-14T19:36:32.006019+00:00 app[web.1]: 2020-11-14 19:36:32.005 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Ignoring
//        2020-11-14T19:36:32.006102+00:00 app[web.1]: 2020-11-14 19:36:32.006 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Did not match any media types
//        2020-11-14T19:36:32.006183+00:00 app[web.1]: 2020-11-14 19:36:32.006 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.NegatedRequestMatcher  : matches = true
//        2020-11-14T19:36:32.006260+00:00 app[web.1]: 2020-11-14 19:36:32.006 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.util.matcher.AndRequestMatcher   : Trying to match using NegatedRequestMatcher [requestMatcher=RequestHeaderRequestMatcher [expectedHeaderName=X-Requested-With, expectedHeaderValue=XMLHttpRequest]]
//        2020-11-14T19:36:32.006336+00:00 app[web.1]: 2020-11-14 19:36:32.006 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.NegatedRequestMatcher  : matches = true
//        2020-11-14T19:36:32.006463+00:00 app[web.1]: 2020-11-14 19:36:32.006 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.util.matcher.AndRequestMatcher   : Trying to match using NegatedRequestMatcher [requestMatcher=MediaTypeRequestMatcher [contentNegotiationStrategy=org.springframework.web.accept.ContentNegotiationManager@2ab2710, matchingMediaTypes=[multipart/form-data], useEquals=false, ignoredMediaTypes=[*/*]]]
//        2020-11-14T19:36:32.006621+00:00 app[web.1]: 2020-11-14 19:36:32.006 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : httpRequestMediaTypes=[*/*]
//        2020-11-14T19:36:32.015508+00:00 app[web.1]: 2020-11-14 19:36:32.015 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Processing */*
//        2020-11-14T19:36:32.015594+00:00 app[web.1]: 2020-11-14 19:36:32.015 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Ignoring
//        2020-11-14T19:36:32.015653+00:00 app[web.1]: 2020-11-14 19:36:32.015 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Did not match any media types
//        2020-11-14T19:36:32.015729+00:00 app[web.1]: 2020-11-14 19:36:32.015 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.NegatedRequestMatcher  : matches = true
//        2020-11-14T19:36:32.015876+00:00 app[web.1]: 2020-11-14 19:36:32.015 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.util.matcher.AndRequestMatcher   : Trying to match using NegatedRequestMatcher [requestMatcher=MediaTypeRequestMatcher [contentNegotiationStrategy=org.springframework.web.accept.ContentNegotiationManager@2ab2710, matchingMediaTypes=[text/event-stream], useEquals=false, ignoredMediaTypes=[*/*]]]
//        2020-11-14T19:36:32.016140+00:00 app[web.1]: 2020-11-14 19:36:32.016 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : httpRequestMediaTypes=[*/*]
//        2020-11-14T19:36:32.016226+00:00 app[web.1]: 2020-11-14 19:36:32.016 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Processing */*
//        2020-11-14T19:36:32.016296+00:00 app[web.1]: 2020-11-14 19:36:32.016 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Ignoring
//        2020-11-14T19:36:32.016353+00:00 app[web.1]: 2020-11-14 19:36:32.016 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.m.MediaTypeRequestMatcher      : Did not match any media types
//        2020-11-14T19:36:32.016424+00:00 app[web.1]: 2020-11-14 19:36:32.016 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.u.matcher.NegatedRequestMatcher  : matches = true
//        2020-11-14T19:36:32.016491+00:00 app[web.1]: 2020-11-14 19:36:32.016 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.util.matcher.AndRequestMatcher   : All requestMatchers returned true
//        2020-11-14T19:36:32.023737+00:00 app[web.1]: 2020-11-14 19:36:32.023 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.s.HttpSessionRequestCache        : DefaultSavedRequest added to Session: DefaultSavedRequest[https://hicks-recipe-book.herokuapp.com/user]
//        2020-11-14T19:36:32.023810+00:00 app[web.1]: 2020-11-14 19:36:32.023 DEBUG 4 --- [io-57541-exec-8] o.s.s.w.a.ExceptionTranslationFilter     : Calling Authentication entry point.
//        2020-11-14T19:36:32.024093+00:00 app[web.1]: 2020-11-14 19:36:32.024 DEBUG 4 --- [io-57541-exec-8] w.c.HttpSessionSecurityContextRepository : SecurityContext is empty or contents are anonymous - context will not be stored in HttpSession.
//        2020-11-14T19:36:32.024176+00:00 app[web.1]: 2020-11-14 19:36:32.024 DEBUG 4 --- [io-57541-exec-8] s.s.w.c.SecurityContextPersistenceFilter : SecurityContextHolder now cleared, as request processing completed
//        2020-11-14T19:36:32.054120+00:00 heroku[router]: at=info method=GET path="/user" host=hicks-recipe-book.herokuapp.com request_id=e819de13-fb24-4120-a535-53a70f3d99bc fwd="73.44.67.59" dyno=web.1 connect=2ms service=209ms status=401 bytes=532 protocol=https