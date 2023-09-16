package com.grupo3.msvakitas.repository;

import com.grupo3.msvakitas.model.dto.TransactionDTO;
import com.grupo3.msvakitas.model.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {




}
