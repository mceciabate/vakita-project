package com.grupo3.msvakitas.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

    private Long transactionId;
    private Long userId;
    private Long vakitaId;
    private Double amount;

    //CONSTRUCTOR SIN ID
    public TransactionDTO(Long userId, Long vakitaId, Double amount) {
        this.userId = userId;
        this.vakitaId = vakitaId;
        this.amount = amount;
    }
}
