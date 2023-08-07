package com.grupo3.msvakitas.model.dto;

import com.grupo3.msvakitas.model.enums.VakitaTypes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VakitaDTO {

    private Long id;
    private String name;
    private Long idCreatorUser;
    private String description;
    private String imgURL;
    private Double totalAmount;
    private Double cumulativeAmount = 0.0;
    private LocalDate creationDate;
    private LocalDate expirationDate;
    private Boolean isActive;
    private VakitaTypes type;
    private List<UserDTO> contributors;

    //CONSTRUCTOR SIN ID

    public VakitaDTO(String name, Long idCreatorUser, String description, String imgURL, Double totalAmount, Double cumulativeAmount, LocalDate creationDate, LocalDate expirationDate, Boolean isActive, VakitaTypes type, List<UserDTO> contributors) {
        this.name = name;
        this.idCreatorUser = idCreatorUser;
        this.description = description;
        this.imgURL = imgURL;
        this.totalAmount = totalAmount;
        this.cumulativeAmount = cumulativeAmount;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
        this.isActive = isActive;
        this.type = type;
        this.contributors = contributors;
    }

    //CONSTRUCTOR SIN ID NI CONTRIBUYENTES

    public VakitaDTO(String name, Long idCreatorUser, String description, String imgURL, Double totalAmount, Double cumulativeAmount, LocalDate creationDate, LocalDate expirationDate, Boolean isActive, VakitaTypes type) {
        this.name = name;
        this.idCreatorUser = idCreatorUser;
        this.description = description;
        this.imgURL = imgURL;
        this.totalAmount = totalAmount;
        this.cumulativeAmount = cumulativeAmount;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
        this.isActive = isActive;
        this.type = type;
    }
}
