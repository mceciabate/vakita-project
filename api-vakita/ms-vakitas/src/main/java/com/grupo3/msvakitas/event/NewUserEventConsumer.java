package com.grupo3.msvakitas.event;

import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.service.impl.UsuarioService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.grupo3.msvakitas.configuration.RabbitMQConfig;
import java.io.Serializable;

@Component
public class NewUserEventConsumer {


    @Autowired
    private UsuarioService service;




    @RabbitListener(queues = RabbitMQConfig.QUEUE_NEW_USER)
        public void execute(Data data){
            UserDTO newUser = new UserDTO();
            BeanUtils.copyProperties(data.getUser(), newUser);
            service.createUser(newUser);


    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Data implements Serializable {
        private UserDTO user = new UserDTO();

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class UserDto {
            private Long id;
            private String email;

        }
    }

}
