package com.grupo3.msvakitas.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;


@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable{

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", unique = true, nullable = false)
    private Long id;
    @Column(name = "USER_EMAIL", nullable = false, length = 200)
    private String email;
//    @JoinTable(
//            name = "vakitas_users",
//            joinColumns = @JoinColumn(name = "FK_vakita", nullable = false),
//            inverseJoinColumns = @JoinColumn(name="FK_users", nullable = false)
//    )
//    @ManyToMany(cascade = CascadeType.ALL)
//    private List<Vakita> vakitas;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "contributors")
    private List<Vakita> vakitas;



    //CONTRUCTOR SIN ARRAY DE VAKITAS
    public User(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public User(String email) {
        this.email = email;
    }
}


