package com.grupo3.msusuarios.model.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", unique = true, nullable = false)
    private Long id;
    @Column(name = "NAME", nullable = false, length = 50)
    private String name;
    @Column(name = "LAST_NAME", nullable = false, length = 50)
    private String lastName;
    @Column(name = "DNI", nullable = false, length = 20)
    private String dni;
    @Column(name = "EMAIL", nullable = false, length = 50)
    private String email;
    @Column(name = "PASSWORD", nullable = false, length = 50)
    private String password;
    @Column(name = "BIRTHDATE", nullable = false)
    private LocalDate birthdate;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<String> vakitas = new ArrayList<>();

    //private ArrayList<> vakitas;

    //Data
//    public User() {
//        //No-args constructor
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getDni() {
//        return dni;
//    }
//
//    public void setDni(String dni) {
//        this.dni = dni;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public LocalDate getBirthdate() {
//        return birthdate;
//    }
//
//    public void setBirthdate(LocalDate birthdate) {
//        this.birthdate = birthdate;
//    }

//    @Override
//    public String toString() {
//        return "User{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", dni='" + dni + '\'' +
//                ", email='" + email + '\'' +
//                ", password='" + password + '\'' +
//                ", birthdate=" + birthdate +
//                '}';
//    }
}