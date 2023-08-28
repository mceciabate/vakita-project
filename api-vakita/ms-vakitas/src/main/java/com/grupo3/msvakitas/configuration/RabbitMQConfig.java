package com.grupo3.msvakitas.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    //Inicio userAmountExchange
    public static final String EXCHANGE_NAME_USER_AMOUNT = "userAmountExchange";
    public static final String TOPIC_NEW_USER_AMOUNT = "com.grupo3.msvakitas.newSetAmount";
    //Fin userAmountExchange

    public static final String EXCHANGE_NAME = "userExchange";

    public static final String TOPIC_NEW_USER = "com.grupo3.msusuarios.newUser";

    public static final String QUEUE_NEW_USER = "newUserQueue";


    //Inicio userAmountExchange
    @Bean
    public TopicExchange appExchangeAmount() {
        return new TopicExchange(EXCHANGE_NAME_USER_AMOUNT);
    }
    //Fin userAmountExchange

    @Bean
    public TopicExchange appExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue newUserQueue() {
        return new Queue(QUEUE_NEW_USER, true);
    }


    @Bean
    public Binding declareBindingSpecificNewUser() {
        return BindingBuilder.bind(newUserQueue()).to(appExchange()).with(TOPIC_NEW_USER);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final var rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }



}
