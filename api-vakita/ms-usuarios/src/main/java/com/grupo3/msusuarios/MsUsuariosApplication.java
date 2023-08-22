package com.grupo3.msusuarios;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication/*(exclude = {SecurityAutoConfiguration.class,
		org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class})*/
@EnableRabbit
public class MsUsuariosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsUsuariosApplication.class, args);

	}
	}


