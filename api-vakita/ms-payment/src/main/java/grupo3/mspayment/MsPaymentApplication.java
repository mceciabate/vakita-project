package grupo3.mspayment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import  org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication/*(exclude = {SecurityAutoConfiguration.class,
		org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class})*/
@EnableMongoRepositories
//@EnableDiscoveryClient
public class MsPaymentApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(MsPaymentApplication.class, args);
	}

}
