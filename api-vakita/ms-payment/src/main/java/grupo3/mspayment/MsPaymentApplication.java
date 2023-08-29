package grupo3.mspayment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories
public class MsPaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsPaymentApplication.class, args);
	}

}
