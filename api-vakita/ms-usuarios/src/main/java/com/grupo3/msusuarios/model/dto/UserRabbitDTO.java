package com.grupo3.msusuarios.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRabbitDTO implements Serializable {

        @Serial
        private static final long serialVersionUID = 1L;
        private Long id;
        private String email;

    public UserRabbitDTO(String email) {
        this.email = email;
    }
}
