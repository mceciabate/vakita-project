package com.grupo3.msvakitas.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;

@Data
@NoArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction {

    @Serial
    private static final long serialVersionUID = 1L;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRANSACTION_ID", unique = true, nullable = false)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "VAKITA_ID", nullable = false)
    private Long vakitaId;

    @Column(name = "AMOUNT", nullable = false)
    private Double amount;




}
