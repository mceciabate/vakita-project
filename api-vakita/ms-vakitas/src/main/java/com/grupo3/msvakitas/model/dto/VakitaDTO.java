package com.grupo3.msvakitas.model.dto;

import com.grupo3.msvakitas.model.enums.VakitaTypes;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class VakitaDTO {

    private Long id;
    private String name;
    private Long idCreatorUser;
    private String description;
    private Double totalAmount;
    private Double cumulativeAmount = 0.0;
    private LocalDate creationDate;
    private LocalDate expirationDate;
    private Boolean isActive;
    private VakitaTypes type;
}
