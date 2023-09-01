package com.grupo3.msvakitas.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TransactionDTO {

    private Long id;
    private Long userId;
    private Long vakitaId;
    private Double amount;

    public TransactionDTO(Long userId, Long vakitaId, Double amount) {
        this.userId = userId;
        this.vakitaId = vakitaId;
        this.amount = amount;
    }
}
