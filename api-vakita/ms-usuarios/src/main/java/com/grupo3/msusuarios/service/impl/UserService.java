package com.grupo3.msusuarios.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.model.entity.User;
import com.grupo3.msusuarios.repository.IUserRepository;
import com.grupo3.msusuarios.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final ObjectMapper mapper;

    @Autowired
    public UserService(IUserRepository userRepository, ObjectMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Override
    public UserDTO save(UserDTO userDTO) {
        User user = mapper.convertValue(userDTO, User.class);
        userRepository.save(user);
        return userDTO;
    }

    @Override
    public UserDTO findById(Long id) {
        UserDTO userDTO = null;
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userDTO = mapper.convertValue(user, UserDTO.class);
        }
        return userDTO;
    }

    @Override
    public UserDTO updateById(Long id, UserDTO userDTO) {
        User user = mapper.convertValue(userDTO, User.class);
        userRepository.save(user);
        return userDTO;
    }

    @Override
    public Boolean changePassword(Long id, String newPassword) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            return false;
        }
        user.setPassword(newPassword);
        userRepository.save(user);
        return true;
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(user -> mapper.convertValue(user, UserDTO.class)).toList();
    }
}
