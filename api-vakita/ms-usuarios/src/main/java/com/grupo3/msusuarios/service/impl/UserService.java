package com.grupo3.msusuarios.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.event.NewUserEventProducer;
import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.model.dto.UserRabbitDTO;
import com.grupo3.msusuarios.model.entity.User;
import com.grupo3.msusuarios.repository.IUserRepository;
import com.grupo3.msusuarios.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final ObjectMapper mapper;

    private final NewUserEventProducer event;

    @Autowired
    public UserService(IUserRepository userRepository, ObjectMapper mapper, NewUserEventProducer event) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.event = event;
    }

    @Override
    @Transactional
    public UserDTO save(UserDTO userDTO) throws Exception {
        try {
            User user = mapper.convertValue(userDTO, User.class);
            log.info("Saving user: " + userDTO.getName());
            userRepository.save(user);
            UserRabbitDTO userToSend = new UserRabbitDTO(userDTO.getEmail());
            event.execute(userToSend);
            return userDTO;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public UserDTO findById(Long id) throws Exception {
        try {
            User user = userRepository.findById(id).orElse(null);
            if(user != null){
                UserDTO userDTO = mapper.convertValue(user, UserDTO.class);
                return userDTO;
            }
            return null;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public UserDTO updateById(Long id, UserDTO userDTO) throws Exception {
        try {
            Optional<User> findUser = userRepository.findById(id);
            if(findUser.isPresent()){
                User user = mapper.convertValue(userDTO, User.class);
                userRepository.save(user);
                return userDTO;
            }
            return null;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Boolean changePassword(Long id, String newPassword) throws Exception {
        try {
            User user = userRepository.findById(id).orElse(null);
            if(user != null){
                user.setPassword(newPassword);
                userRepository.save(user);
                return true;
            }else {
                return false;
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Boolean deleteById(Long id) throws Exception {
        try {
            if(userRepository.existsById(id)){
                userRepository.deleteById(id);
                return true;
            }else {
                return false;
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<UserDTO> findAll() throws Exception {
        try {
            return userRepository.findAll().stream().map(user -> mapper.convertValue(user, UserDTO.class)).toList();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
