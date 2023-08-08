package com.grupo3.msusuarios.event;


import com.grupo3.msusuarios.config.RabbitMQConfig;
import com.grupo3.msusuarios.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Component
@Slf4j
public class NewUserEventProducer {

    private final RabbitTemplate rabbitTemplate;


    public NewUserEventProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void execute(User newUser){
        Data data = new Data();
        BeanUtils.copyProperties(newUser, data.getUser());
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.TOPIC_NEW_USER, data);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor

    public static class Data implements Serializable{
        @Serial
        private static final long serialVersionUID = 1L;
        private Data.User user = new Data.User();

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class User implements Serializable{
            @Serial
            private static final long serialVersionUID = 1L;
            private Long id;
            private String name;
            private String lastName;
            private String dni;
            private String email;
            private String password;
            private LocalDate birthdate;
        }


    }
}
