package com.grupo3.msvakitas.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;


@Data
@Entity
public class User implements Serializable{

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String email;
    @JoinTable(
            name = "vakitas_users",
            joinColumns = @JoinColumn(name = "FK_vakita", nullable = false),
            inverseJoinColumns = @JoinColumn(name="FK_users", nullable = false)
    )
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Vakita> vakitas;
}


