package com.grupo3.msvakitas.service;

import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.UserDTO;

import java.util.List;


//EN EN FUTURO ESTE SERVICE DEBERÍA UTILIZARSE PARA LA COLA DE MENSAJERÍA
public interface IUsuarioService {

    void createUser(UserDTO user);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id) throws ResourceNotFoundException;
}
