package com.grupo3.msusuarios;

import com.grupo3.msusuarios.config.RabbitMQConnection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsUsuariosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsUsuariosApplication.class, args);
//		RabbitMQConnection example = new RabbitMQConnection();
//		example.connectToRabbitMQ();
	}
	}


