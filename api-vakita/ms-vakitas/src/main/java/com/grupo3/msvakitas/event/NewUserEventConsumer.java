package com.grupo3.msvakitas.event;

import com.grupo3.msvakitas.configuration.RabbitMQConfig;
import com.grupo3.msvakitas.model.entity.User;
import com.grupo3.msvakitas.repository.IUsuarioRepository;
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
public class NewUserEventConsumer {

    @Autowired
    private IUsuarioRepository repository;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NEW_USER)
        public void execute(NewUserEventConsumer.Data data){
            User newUser = new User();
            BeanUtils.copyProperties(data.getUser(), newUser);
            repository.save(newUser);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Data implements Serializable {
        private UserToSave user = new UserToSave();

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class UserToSave {
            private Long id;
            private String email;

        }
    }

}
