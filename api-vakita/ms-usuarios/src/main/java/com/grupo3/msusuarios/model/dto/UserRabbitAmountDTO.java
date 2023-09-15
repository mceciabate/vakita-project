package com.grupo3.msusuarios.model.dto;

<<<<<<< HEAD

=======
>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRabbitAmountDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private Long id;
    private Double amount;

}
