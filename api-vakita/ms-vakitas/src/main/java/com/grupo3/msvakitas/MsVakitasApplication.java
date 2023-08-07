package com.grupo3.msvakitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.grupo3.*")
@EnableJpaRepositories(basePackages = "com.grupo3.msvakitas.repository")
public class MsVakitasApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsVakitasApplication.class, args);
	}


}
