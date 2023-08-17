package com.grupo3.msusuarios.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String lastName;
    private String dni;
    private String email;
    private String password;
    private LocalDate birthdate;
    private Double amount;
}
