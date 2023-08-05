package com.grupo3.msvakitas.model.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String mail;
    @JsonIgnore
    private List<VakitaDTO> vakitas;

    //constructor sin vakitas

    public UserDTO(Long id, String mail) {
        this.id = id;
        this.mail = mail;
    }
}
