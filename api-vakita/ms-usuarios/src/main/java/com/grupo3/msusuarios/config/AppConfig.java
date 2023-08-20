package com.grupo3.msusuarios.config;

import com.grupo3.msusuarios.service.impl.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class AppConfig {

    //Defino mi UserDetails para poder acceder a la bd y recuperar datos del user.
    @Bean
    public UserDetailsService userDetailsService(){
        return new CustomUserDetailsService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //deshabilito los cors y doy permisos a las rutas que deben usarse para aunticarse u obtener tokens
        return http.csrf(crsf -> crsf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/usuarios/register",
                                "/api/v1/usuarios/token",
                                "/api/v1/usuarios/validate",
                                "/api/v1/usuarios/confirmar"
                                )
                        .permitAll()

                )
                .build();
    }

    //Encoder para el password

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    //El AuthenticationProvider tomará las credenciales otorgadas por el userDatailsService
    //Luego el Dao utilizará estos datos para contrastar con la bd, por eso necesita el encoder
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(encoder());
        return authenticationProvider;
    }

    // Filtro especializado en manejar la autenticación de la petición,
    // realiza la validación asociada al usuario y la contraseña
    // para que un usuario no registrado no pueda obtener un token
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
