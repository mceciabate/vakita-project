package com.grupo3.msusuarios.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWithoutPasswordDTO {

    private Long id;
    private String name;
    private String lastName;
    private String alias;
    private String dni;
    private String email;
    private LocalDate birthdate;
    private byte[] avatar;
    private Double account_balance;
}
