package model.entity;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Setter
@Getter
@Table
public class Vakita {
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
