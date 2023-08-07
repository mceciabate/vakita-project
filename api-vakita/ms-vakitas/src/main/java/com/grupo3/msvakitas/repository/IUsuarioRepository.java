package com.grupo3.msvakitas.repository;

import com.grupo3.msvakitas.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

//ESTA INTERFAZ SE UTILIZARÍA PARA GUARDAR LO QUE LLEGUE POR MENSAJERIA
@Repository
@Component
public interface IUsuarioRepository extends JpaRepository<User, Long> {
}
