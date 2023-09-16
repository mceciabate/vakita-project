package com.grupo3.msusuarios.event;

import com.grupo3.msusuarios.config.RabbitMQConfig;
import com.grupo3.msusuarios.model.dto.UserRabbitAmountDTO;
import com.grupo3.msusuarios.service.impl.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class NewVakitaEventConsumer {

    @Autowired
    private UserService service;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NEW_USER_AMOUNT)
        public void executeAmount(NewVakitaEventConsumer.Data data) throws Exception {
        try {
            UserRabbitAmountDTO user = new UserRabbitAmountDTO();
            BeanUtils.copyProperties(data.getUser(), user);
            service.updateAccountBalanceFromVakita(user.getId(), user.getAmount());
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Data implements Serializable {
        private UserAmountToSave user = new UserAmountToSave();

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class UserAmountToSave {
            private Long id;
            private Double amount;
        }
    }
}
