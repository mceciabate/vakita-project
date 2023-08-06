package com.grupo3.msusuarios.service;

import com.grupo3.msusuarios.handler.BadRequestException;
import com.grupo3.msusuarios.model.dto.UserDTO;

import java.util.List;

public interface IUserService {

    UserDTO save(UserDTO userDTO) throws BadRequestException;
    UserDTO findById(Long id);
    UserDTO updateById(Long id, UserDTO userDTO);
    Boolean changePassword(Long id, String newPassword);
    void deleteById(Long id);
    List<UserDTO> findAll();
}
