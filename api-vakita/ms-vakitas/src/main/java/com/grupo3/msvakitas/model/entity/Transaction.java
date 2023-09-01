package com.grupo3.msvakitas.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRANSACTION_ID", unique = true, nullable = false)
    private Long transactionId;


    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne()
    @JoinColumn(name = "vakita_id")
    private Vakita vakita;

    @Column(name = "AMOUNT", nullable = false)
    private Double amount;

    public Transaction(Long userId, Vakita vakita, Double amount) {
        this.userId = userId;
        this.vakita = vakita;
        this.amount = amount;
    }
}
