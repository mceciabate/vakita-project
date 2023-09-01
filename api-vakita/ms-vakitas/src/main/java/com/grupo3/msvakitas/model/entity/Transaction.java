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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRANSACTION_ID", unique = true, nullable = false)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "vakita_id")
    private Vakita vakita;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Column(name = "AMOUNT", nullable = false)
    private Double amount;




}
