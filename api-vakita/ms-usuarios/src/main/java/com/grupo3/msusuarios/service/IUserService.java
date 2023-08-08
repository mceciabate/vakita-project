package com.grupo3.msusuarios.service;

import com.grupo3.msusuarios.model.dto.UserDTO;

import java.util.List;

public interface IUserService {

    UserDTO save(UserDTO userDTO) throws Exception;
    UserDTO findById(Long id) throws Exception;
    UserDTO updateById(Long id, UserDTO userDTO) throws Exception;
    Boolean changePassword(Long id, String newPassword) throws Exception;
    Boolean deleteById(Long id) throws Exception;
    List<UserDTO> findAll() throws Exception;
}
