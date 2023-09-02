package com.grupo3.msusuarios.model.dto;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {

    @Hidden
    private Long id;
    @NotBlank(message = "No puede ingresar un nombre vacio")
    @Size(max = 30 ,message = "El nombre no puede contener mas de 30 caracteres")
    private String name;
    @NotBlank(message = "No puede ingresar un apellido vacio")
    @Size(max = 30 ,message = "El apellido no puede contener mas de 30 caracteres")
    private String lastName;
    @Size(max = 1024 * 1024, message = "El tamaño máximo del avatar es de 1 MB")
    private byte[] avatar;
}
