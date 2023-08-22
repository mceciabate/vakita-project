package com.grupo3.msusuarios.service.impl;

import com.grupo3.msusuarios.config.CustomUserDetails;
import com.grupo3.msusuarios.model.dto.UserDTO;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService service;


    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserDTO> userToAutenticate = Optional.ofNullable(service.findByEmail(email));
        //Acá mapeo lo que recibo del service a mi clase UserDatails
        return userToAutenticate.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with email :" + email));
    }
}
