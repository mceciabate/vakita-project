package com.grupo3.msusuarios.event;


import com.grupo3.msusuarios.config.RabbitMQConfig;
import com.grupo3.msusuarios.model.dto.UserDTO;
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

@Component
@Slf4j
public class NewUserEventProducer {

    private final RabbitTemplate rabbitTemplate;


    public NewUserEventProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void execute(UserDTO newUser){
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
        private UserDTO user = new UserDTO();


    }
}
