package com.grupo3.msusuarios;

import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.service.impl.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class MsUsuariosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsUsuariosApplication.class, args);
	}



	@Bean
	public CommandLineRunner loadData(UserService service) {
		return (args) -> {
			if (!service.findAll().isEmpty()) {
				return;
			}

			service.save(new UserDTO(null, "Cecilia", "Abate", "12345678", "cecilia@mail.com", "1234", LocalDate.now()));
			service.save(new UserDTO(null, "Juana", "Lopez", "15864596", "juana@mail.com", "45678", LocalDate.parse("1990-07-23")));
			service.save(new UserDTO(null, "Sergio", "Agila", "56895747", "sergio@mail.com", "91011", LocalDate.parse("1987-01-07")));
			service.save(new UserDTO(null, "Estefanía", "Casas", "98523614", "estefania@mail.com", "3698", LocalDate.parse("2001-04-29")));
			service.save(new UserDTO(null, "Carla", "Rodriguez", "36584258", "carla@mail.com", "589624", LocalDate.parse("1964-11-17")));




		};
	}
}
