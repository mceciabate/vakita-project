package com.grupo3.msvakitas.repository;

import com.grupo3.msvakitas.model.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
}
