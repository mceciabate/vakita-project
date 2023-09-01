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

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "vakita_id", nullable = false)
    private Long vakitaId;

    @Column(name = "AMOUNT", nullable = false)
    private Double amount;

    public Transaction(User user, Long vakitaId, Double amount) {
        this.user = user;
        this.vakitaId = vakitaId;
        this.amount = amount;
    }
}
