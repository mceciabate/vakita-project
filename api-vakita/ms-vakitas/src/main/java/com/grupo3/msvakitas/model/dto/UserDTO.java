package com.grupo3.msvakitas.model.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String email;

    private List<TransactionDTO> transactions = new ArrayList<>();

    @JsonIgnore
    private List<VakitaDTO> vakitas;


    //constructor sin vakitas

    public UserDTO(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public UserDTO(Long id, String email, List<TransactionDTO> transactions) {
        this.id = id;
        this.email = email;
        this.transactions = transactions;
    }

    //constructor in id y sin vakitas
    public UserDTO(String email) {
        this.email = email;
    }
}
