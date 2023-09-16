package com.grupo3.msusuarios.service;

import com.grupo3.msusuarios.model.dto.AuthResponseDTO;
import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.model.dto.UserUpdateDTO;
import com.grupo3.msusuarios.model.dto.UserWithoutPasswordDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IUserService {

    UserDTO save(UserDTO userDTO) throws Exception;
    UserDTO findById(Long id) throws Exception;
    UserDTO findByDni(String dni) throws Exception;
    UserDTO findByEmail(String email) throws Exception;
    UserWithoutPasswordDTO updateById(Long id, UserUpdateDTO userDTO) throws Exception;
    Boolean changePassword(Long id, String newPassword) throws Exception;
    Boolean deleteById(Long id) throws Exception;
    List<UserWithoutPasswordDTO> findAll() throws Exception;
    @Transactional
    void updateAccountBalanceFromVakita(Long userId, Double amount) throws Exception;

    @Transactional
    void updateAccountBalanceFromClient(Long userId, Double amount) throws Exception;

    //MÉTODO PARA CREAR TOKEN
    AuthResponseDTO generateToken(String email) throws Exception;

    //MÉTODO PARA VALIDAR TOKEN
    void validateToken(String token) throws Exception;

}
