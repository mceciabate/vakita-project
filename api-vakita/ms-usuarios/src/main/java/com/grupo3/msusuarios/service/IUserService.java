package com.grupo3.msusuarios.service;

import com.grupo3.msusuarios.model.dto.AuthResponseDTO;
import com.grupo3.msusuarios.model.dto.UserDTO;
<<<<<<< HEAD
=======
import com.grupo3.msusuarios.model.dto.UserUpdateDTO;
>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
import com.grupo3.msusuarios.model.dto.UserWithoutPasswordDTO;

import java.util.List;

public interface IUserService {

    UserDTO save(UserDTO userDTO) throws Exception;
    UserDTO findById(Long id) throws Exception;
<<<<<<< HEAD
    UserDTO findByEmail(String email) throws Exception;
    UserDTO updateById(Long id, UserDTO userDTO) throws Exception;
=======
    UserDTO findByDni(String dni) throws Exception;
    UserDTO findByEmail(String email) throws Exception;
    UserWithoutPasswordDTO updateById(Long id, UserUpdateDTO userDTO) throws Exception;
>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
    Boolean changePassword(Long id, String newPassword) throws Exception;
    Boolean deleteById(Long id) throws Exception;
    List<UserWithoutPasswordDTO> findAll() throws Exception;
    void updateAccountBalance(Long id, Double amount) throws Exception;

    //MÉTODO PARA CREAR TOKEN
    AuthResponseDTO generateToken(String email) throws Exception;

    //MÉTODO PARA VALIDAR TOKEN
    void validateToken(String token) throws Exception;
}
