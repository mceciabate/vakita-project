package com.grupo3.msusuarios;

import org.apache.log4j.PropertyConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class MsUsuariosApplication {

	public static void main(String[] args) {

		//log4j configuration for global errors
		PropertyConfigurator.configure("log4j.properties");

		SpringApplication.run(MsUsuariosApplication.class, args);
	}

}
