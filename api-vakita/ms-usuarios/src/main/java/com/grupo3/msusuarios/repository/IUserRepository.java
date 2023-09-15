package com.grupo3.msusuarios.repository;

import com.grupo3.msusuarios.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmail(String email);
<<<<<<< HEAD
=======
    Optional<User> findByDni(String email);
>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
}
