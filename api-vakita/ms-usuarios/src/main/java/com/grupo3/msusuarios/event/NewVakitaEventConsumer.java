package com.grupo3.msusuarios.event;

import com.grupo3.msusuarios.config.RabbitMQConfig;
import com.grupo3.msusuarios.model.entity.User;
import com.grupo3.msusuarios.repository.IUserRepository;
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
    private IUserRepository userRepository;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NEW_USER_AMOUNT)
        public void executeAmount(NewVakitaEventConsumer.Data data) {
            User newSetAmount = new User();
            BeanUtils.copyProperties(data.getUser(), newSetAmount);
            User userOptional = userRepository.findById(newSetAmount.getId()).orElse(null);
            userOptional.setAmount(newSetAmount.getAmount());
            userRepository.save(userOptional);
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