package com.grupo3.msusuarios.model.dto;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEmailDTO {

    @Hidden
    private Long id;
    @NotBlank(message = "No puede ingresar un email vacio")
    private String email;
}
