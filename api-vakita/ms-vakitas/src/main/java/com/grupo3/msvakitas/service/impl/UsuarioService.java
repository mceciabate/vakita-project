package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.entity.User;
import com.grupo3.msvakitas.repository.IUsuarioRepository;
import com.grupo3.msvakitas.service.IUsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
    public List<UserDTO> getAllUsers(){
        List<UserDTO> listUsers = new ArrayList<>();
        List<User> usuarios = usuarioRepository.findAll();
        usuarios.forEach(user -> listUsers.add(mapper.map(user, UserDTO.class)));
        return  listUsers;

    }

    @Override
    public UserDTO getUserById(Long id) throws ResourceNotFoundException {
        Optional<User> userEntity = usuarioRepository.findById(id);
        UserDTO user;
        if(!userEntity.isPresent()){
            throw new ResourceNotFoundException("No existe el usuario");
        }
        else{
            user = mapper.map(userEntity, UserDTO.class);
        }
        return user;
    }
}
