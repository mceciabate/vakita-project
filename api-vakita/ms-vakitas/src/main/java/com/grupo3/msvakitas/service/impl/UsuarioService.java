package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.entity.User;
import com.grupo3.msvakitas.repository.IUsuarioRepository;
import com.grupo3.msvakitas.service.IUsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

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
}
