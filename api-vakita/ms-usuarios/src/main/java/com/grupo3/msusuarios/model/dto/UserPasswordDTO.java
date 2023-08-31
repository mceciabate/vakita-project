package com.grupo3.msusuarios.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPasswordDTO {

    private Long id;
    @NotBlank(message = "No puede ingresar un password vacio")
    private String password;
}
