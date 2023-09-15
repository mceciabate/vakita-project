package com.grupo3.msvakitas.model.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

    private Long transactionId;

    private LocalDate date;
    private Long userId;
    private Long vakitaId;
    private Double amount;

    //CONSTRUCTOR SIN ID

    public TransactionDTO(LocalDate date, Long userId, Long vakitaId, Double amount) {
        this.date = date;
        this.userId = userId;
        this.vakitaId = vakitaId;
        this.amount = amount;
    }
}
