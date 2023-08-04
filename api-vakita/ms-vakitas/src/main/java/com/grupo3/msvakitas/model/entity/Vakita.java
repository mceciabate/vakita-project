package com.grupo3.msvakitas.model.entity;

import com.grupo3.msvakitas.model.enums.VakitaTypes;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;


@Data
@NoArgsConstructor
@Entity
@Table(name = "vakitas")
public class Vakita implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "VAQUITA_ID", unique = true, nullable = false)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name = "USER_ID", nullable = false)
    private Long idCreatorUser;

    @Column(name = "DESCRIPTION", nullable = false, length = 100)
    private String description;

    @Column(name = "TOTAL_AMOUNT", nullable = false)
    private Double totalAmount;

    @Column(name = "CUMULATIVE_AMOUNT", nullable = false)
    private Double cumulativeAmount = 0.0;

    @Column(name = "CREATION_DATE", nullable = false)
    private LocalDate creationDate;

    @Column(name = "EXPIRATION_DATE", nullable = false)
    private LocalDate expirationDate;

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive;

    @Column(name = "TYPE", nullable = false)
    private VakitaTypes type;

    @ManyToMany(mappedBy="vakitas", fetch = FetchType.EAGER)
    private List<User> contributors;
}
