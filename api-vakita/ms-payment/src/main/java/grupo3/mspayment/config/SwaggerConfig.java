package grupo3.mspayment.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@OpenAPIDefinition
@Configuration
public class SwaggerConfig {

    // Agregar definición de esquema de seguridad
    SecurityScheme securityScheme = new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT");

    // Agregar esquema de seguridad a la documentación
    SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("SpringShop API")
                        .title("ms-payment").version("1.0.0")
                        .description("Proyecto Integrador")
                        .version("v0.0.1")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("SpringShop Wiki Documentation")
                        .url("https://springshop.wiki.github.org/docs"))
                .addSecurityItem(securityRequirement) // Agregar esquema de seguridad
                .schemaRequirement("bearerAuth", securityScheme) // Agregar definición de esquema de seguridad
                .servers(Arrays.asList(
                        new Server().url("http://107.22.65.36:8080").description("Gateway Server")));
    }
}
