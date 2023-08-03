package com.grupo3.msvakitas.model.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "vakita")
public class Vakita implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VAQUITA_ID", unique = true, nullable = false)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name = "USER_ID", nullable = false)
    private Long idCreatorUser;

    @Column(name = "NAME", nullable = false, length = 100)
    private String description;

    @Column(name = "TOTAL_AMOUNT", nullable = false, columnDefinition = "float(8,2)")
    private Double totalAmount;

    @Column(name = "CUMULATIVE_AMOUNT", nullable = false, columnDefinition = "float(8,2) default 0.0")
    private Double cumulativeAmount;
//    private List<User> listaUsuarios = new ArrayList<>();

    @Column(name = "CREATION_DATE", nullable = false)
    private LocalDate creationDate;

    @Column(name = "EXPIRATION_DATE", nullable = false)
    private LocalDate expirationDate;

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive;
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

//
//    @Override
//    public String toString() {
//        return "Vakita{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", idCreatorUser=" + idCreatorUser +
//                ", description='" + description + '\'' +
//                ", totalAmount=" + totalAmount +
//                ", cumulativeAmount=" + cumulativeAmount +
//                ", creationDate=" + creationDate +
//                ", expirationDate=" + expirationDate +
//                ", isActive=" + isActive +
//                '}';
//    }
}
