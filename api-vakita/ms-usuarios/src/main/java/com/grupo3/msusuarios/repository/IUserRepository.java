package com.grupo3.msusuarios.repository;

import com.grupo3.msusuarios.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmail(String email);
    Optional<User> findByDni(String email);
}
