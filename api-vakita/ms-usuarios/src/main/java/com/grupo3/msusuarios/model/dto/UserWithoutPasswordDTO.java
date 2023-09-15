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
<<<<<<< HEAD
    private String dni;
    private String email;
    private LocalDate birthdate;
=======
    private String alias;
    private String dni;
    private String email;
    private LocalDate birthdate;
    private byte[] avatar;
>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
    private Double account_balance;
}
