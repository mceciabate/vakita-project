package com.grupo3.msvakitas.model.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private Long id;
    private String email;
<<<<<<< HEAD
=======



>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
    @JsonIgnore
    private List<VakitaDTO> vakitas;


    //constructor sin vakitas

    public UserDTO(Long id, String email) {
        this.id = id;
        this.email = email;
    }
<<<<<<< HEAD
=======

>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
    //constructor in id y sin vakitas
    public UserDTO(String email) {
        this.email = email;
    }
}
