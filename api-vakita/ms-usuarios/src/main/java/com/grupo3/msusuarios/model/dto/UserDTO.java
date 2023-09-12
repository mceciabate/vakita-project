package com.grupo3.msusuarios.model.dto;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @Hidden
    private Long id;
    @NotBlank(message = "No puede ingresar un nombre vacio")
    @Size(max = 30 ,message = "El nombre no puede contener mas de 30 caracteres")
    private String name;
    @NotBlank(message = "No puede ingresar un apellido vacio")
    @Size(max = 30 ,message = "El apellido no puede contener mas de 30 caracteres")
    private String lastName;
    @NotBlank(message = "No puede ingresar un alias vacio")
    @Size(max = 30 ,message = "El alias no puede contener mas de 30 caracteres")
    private String alias;
    @NotBlank(message = "No puede ingresar un dni vacio o dni existente")
    private String dni;
    @NotBlank(message = "No puede ingresar un email vacio o email existente")
    private String email;
    @NotBlank(message = "No puede ingresar un password vacio")
    private String password;
    @NotNull(message = "No puede ingresar una fecha vacia")
    private LocalDate birthdate;
    @Hidden
    @Size(max = 1024 * 1024, message = "El tamaño máximo del avatar es de 1 MB")
    private byte[] avatar;
    @Hidden
    private Double account_balance = 0.0;
}
