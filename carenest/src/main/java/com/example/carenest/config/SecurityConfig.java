package com.example.carenest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF for API endpoints (enable it for production)
            .authorizeRequests()
            .requestMatchers("/api/auth/login", "/api/auth/register").permitAll() // Allow these endpoints without authentication
            .anyRequest().authenticated(); // All other endpoints require authentication
        return http.build();
    }
}
