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

public class UserForTransactionRabbitDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private Long id;
    private Double amount;

}
