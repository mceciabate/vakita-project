package com.grupo3.msusuarios.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRabbitAmountDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private Long id;
    private Double amount;

}
