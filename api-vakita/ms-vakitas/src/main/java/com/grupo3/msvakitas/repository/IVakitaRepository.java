package com.grupo3.msvakitas.repository;

import com.grupo3.msvakitas.model.entity.Vakita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVakitaRepository extends JpaRepository<Vakita, Long> {
}
