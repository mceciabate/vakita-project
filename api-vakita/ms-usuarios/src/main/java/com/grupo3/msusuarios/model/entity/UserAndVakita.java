//package com.grupo3.msusuarios.model.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import java.io.Serial;
//import java.io.Serializable;
//
//@Data
//@AllArgsConstructor
//@Entity
//@Table(name = "USER_VAKITA")
//public class UserAndVakita implements Serializable {
//
//    @Serial
//    private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "USER_VAKITA_ID", unique = true, nullable = false)
//    private Long userVakitaID;
//
//    @OneToMany(fetch = FetchType.EAGER)
//    @JoinColumn(name = "USER_ID", nullable = false, referencedColumnName = "USER_ID"
//            , foreignKey = @ForeignKey(name = "FK_USER_VAKITA_ID"))
//
//    @Column(name = "USER_ID", nullable = false)
//    private Long userId;
//
//}
