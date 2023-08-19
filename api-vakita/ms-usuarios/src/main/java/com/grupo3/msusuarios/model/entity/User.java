package com.grupo3.msusuarios.model.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", unique = true, nullable = false)
    private Long id;

    @NotBlank(message = "No puede ingresar un nombre vacio")
    @Size(max = 30 ,message = "El nombre no puede contener mas de 20 caracteres")
    @Column(name = "NAME", nullable = false, length = 30)
    private String name;

    @NotBlank(message = "No puede ingresar un apellido vacio")
    @Size(max = 30 ,message = "El apellido no puede contener mas de 20 caracteres")
    @Column(name = "LAST_NAME", nullable = false, length = 30)
    private String lastName;

    @NotBlank(message = "No puede ingresar un dni vacio")
    @Column(name = "DNI", nullable = false, length = 20)
    private String dni;

    @NotBlank(message = "No puede ingresar un email vacio")
    @Column(name = "EMAIL", nullable = false, length = 50)
    private String email;

    @NotBlank(message = "No puede ingresar un password vacio")
    @Column(name = "PASSWORD", nullable = false, length = 50)
    private String password;

    @NotNull(message = "No puede ingresar una fecha vacia")
    @Column(name = "BIRTHDATE", nullable = false)
    private LocalDate birthdate;

    @Column(name = "ACCOUNT_BALANCE")
    private Double account_balance = 0.0;

}
