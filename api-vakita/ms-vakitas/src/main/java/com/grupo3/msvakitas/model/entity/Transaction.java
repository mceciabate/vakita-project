package com.grupo3.msvakitas.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "transaction")
@ToString
public class Transaction implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRANSACTION_ID", unique = true, nullable = false)
    private Long transactionId;

    @Column(name= "date", nullable = false)
    private LocalDate date;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne()
    @JoinColumn(name = "vakita_id")
    private Vakita vakita;

    @Column(name = "AMOUNT", nullable = false)
    private Double amount;

    public Transaction(LocalDate date, Long userId, Vakita vakita, Double amount) {
        this.date = date;
        this.userId = userId;
        this.vakita = vakita;
        this.amount = amount;
    }
}
