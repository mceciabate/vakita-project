package com.grupo3.msvakitas;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@EnableRabbit
<<<<<<< HEAD
=======
//@EnableDiscoveryClient
>>>>>>> 742943a60c7d2129d269178e98491915a9d5af63
public class MsVakitasApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsVakitasApplication.class, args);
	}


}
