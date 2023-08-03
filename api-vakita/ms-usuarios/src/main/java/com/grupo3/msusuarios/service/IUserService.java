package com.grupo3.msusuarios.service;

import com.grupo3.msusuarios.model.dto.UserDTO;

import java.util.List;

public interface IUserService {

    UserDTO save(UserDTO userDTO);
    UserDTO findById(Long id);
    UserDTO updateById(Long id, UserDTO userDTO);
    String changePassword(String newPassword);
    void deleteById(Long id);
    List<UserDTO> findAll();
}
