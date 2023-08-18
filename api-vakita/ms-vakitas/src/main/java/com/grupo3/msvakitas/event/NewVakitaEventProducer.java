package com.grupo3.msvakitas.event;

import com.grupo3.msvakitas.configuration.RabbitMQConfig;
import com.grupo3.msvakitas.model.dto.UserForTransactionDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.io.Serial;
import java.io.Serializable;

@Component
@Slf4j
@EnableRabbit
public class NewVakitaEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public NewVakitaEventProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void executeAmount(UserForTransactionDTO newAmountTransaction){
        NewVakitaEventProducer.Data data= new NewVakitaEventProducer.Data();
        BeanUtils.copyProperties(newAmountTransaction, data.getUser());
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME_USER_AMOUNT, RabbitMQConfig.TOPIC_NEW_USER_AMOUNT, data);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Data implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;
        private Data.UserDto user = new Data.UserDto();

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class UserDto implements Serializable{
            @Serial
            private static final long serialVersionUID = 1L;
            private Long id;
            private Double amount;
        }
    }
}
