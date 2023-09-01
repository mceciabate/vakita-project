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

    @Column(name = "vakita_ID")
    private Long vakita_Id;

    @Column(name = "AMOUNT", nullable = false)
    private Double amount;




}
