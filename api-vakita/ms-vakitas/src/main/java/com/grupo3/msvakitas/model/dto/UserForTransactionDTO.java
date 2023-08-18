package com.grupo3.msvakitas.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//TODO: RENOMBRÉ ESTA CLASE
public class UserForTransactionDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private Long id;
    private Double amount;

    public UserForTransactionDTO(Double amount) {
        this.amount = amount;
    }
}
