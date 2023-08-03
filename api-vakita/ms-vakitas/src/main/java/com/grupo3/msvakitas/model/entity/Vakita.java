package com.grupo3.msvakitas.model.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "vakita")
public class Vakita implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long idUsuarioPropietario;
    private String description;
    private Double montoTotal;
    private Double montoAcumulado;
//    private List<User> listaUsuarios = new ArrayList<>();
    private Date fechaDeCreacion;
    private Date fechaDeCaducidad;
    private Boolean activo;
//    @Data
//    @AllArgsConstructor
//    public static class User {
//        private String name;
//        private String lastName;
//        private String dni;
//        private String email;
//        private String password;
//        private LocalDate birthdate;
//    }

}
