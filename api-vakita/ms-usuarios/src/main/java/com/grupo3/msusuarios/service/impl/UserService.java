package com.grupo3.msusuarios.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.event.NewUserEventProducer;
import com.grupo3.msusuarios.model.dto.*;
import com.grupo3.msusuarios.model.entity.User;
import com.grupo3.msusuarios.repository.IUserRepository;
import com.grupo3.msusuarios.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final ObjectMapper mapper;
    private final NewUserEventProducer event;

    private final JwtService jwtService;

    private final PasswordEncoder encoder;

    @Autowired
    public UserService(IUserRepository userRepository, ObjectMapper mapper, NewUserEventProducer event, JwtService jwtService, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.event = event;
        this.jwtService = jwtService;
        this.encoder = encoder;
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
    public UserDTO findByDni(String dni) throws Exception {
        try {
            User user = userRepository.findByDni(dni).orElse(null);
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
    public UserDTO findByEmail(String email) throws Exception {
        try {
            User user = userRepository.findByEmail(email).orElse(null);
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
    public UserWithoutPasswordDTO updateById(Long id, UserUpdateDTO userDTO) throws Exception {
        try {
            User findUser = userRepository.findById(id).orElse(null);
            if(findUser != null){
                findUser.setName(userDTO.getName());
                findUser.setLastName(userDTO.getLastName());
                findUser.setAlias(userDTO.getAlias());
                findUser.setAvatar(userDTO.getAvatar());
                UserWithoutPasswordDTO userUpdateDTO = mapper.convertValue(findUser, UserWithoutPasswordDTO.class);
                userRepository.save(findUser);
                return userUpdateDTO;
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
                String encoderPass = this.encoder.encode(newPassword);
                user.setPassword(encoderPass);
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
    public List<UserWithoutPasswordDTO> findAll() throws Exception {
        try {
            return userRepository.findAll().stream().map(user -> mapper.convertValue(user, UserWithoutPasswordDTO.class)).toList();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void updateAccountBalance(Long id, Double amount) throws Exception {
        UserDTO userToModify = this.findById(id);
        try {
            Double accountBalanceUdate = userToModify.getAccount_balance() + amount;
            userToModify.setAccount_balance(accountBalanceUdate);
            userRepository.save(mapper.convertValue(userToModify, User.class));
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    //MÉTODO PARA CREAR TOKEN
    @Override
    public AuthResponseDTO generateToken(String email) throws Exception {
        try{
            AuthResponseDTO response = new AuthResponseDTO();
            Long userId = this.findByEmail(email).getId();
            String token = jwtService.generateToken(email);
            response.setUserId(userId);
            response.setToken(token);
            return response;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }

    }

    //MÉTODO PARA VALIDAR TOKEN
    @Override
    public void validateToken(String token) throws Exception {
        try {
            jwtService.validateToken(token);
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

}
