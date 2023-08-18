package com.grupo3.msusuarios.config;

import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class RabbitMQConnection {
    public void connectToRabbitMQ() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("54.152.71.174");
        factory.setVirtualHost("/");
        factory.setUsername("guest");
        factory.setPassword("guest");

        try (Connection connection = factory.newConnection()) {
            System.out.println("Conexión exitosa al Virtual Host");
        }
    }

}
