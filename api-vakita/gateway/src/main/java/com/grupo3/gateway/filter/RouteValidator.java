package com.grupo3.gateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    //En el ruteo establezco que si la petición viene de estas uris, ignore la validación

    public static final List<String> openApiEndpoints = List.of(
            "/api/v1/usuarios/register",
            "/api/v1/usuarios/token",
            "api/v1/usuarios/confirmar",
            "/eureka"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}