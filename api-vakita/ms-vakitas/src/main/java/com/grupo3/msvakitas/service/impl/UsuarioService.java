package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.entity.User;
import com.grupo3.msvakitas.repository.IUsuarioRepository;
import com.grupo3.msvakitas.service.IUsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private IUsuarioRepository usuarioRepository;


    @Override
    public void createUser(UserDTO user) {
        User userToSave = mapper.map(user, User.class);
        usuarioRepository.save(userToSave);

    }

    @Override
    public UserDTO getUserById(Long id){
        Optional<User> userEntity = usuarioRepository.findById(id);
        UserDTO user = mapper.map(userEntity, UserDTO.class);
        return user;
    }
}
