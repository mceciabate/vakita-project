package com.grupo3.msvakitas.service;

import com.grupo3.msvakitas.model.dto.UserDTO;



//EN EN FUTURO ESTE SERVICE DEBERÍA UTILIZARSE PARA LA COLA DE MENSAJERÍA
public interface IUsuarioService {

    void createUser(UserDTO user);
}
