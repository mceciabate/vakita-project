package com.grupo3.msusuarios.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.validation.BindingResult;

import java.util.*;
import java.util.stream.Collectors;

public class FormatMessage {

    public static String formatMessage(BindingResult result){
        List<Map<String,String>> erros = result.getFieldErrors().stream()
                .map(err -> {
                    Map<String,String> error = new HashMap<>();
                    error.put(err.getField(), err.getDefaultMessage());
                    return error;
                }).collect(Collectors.toList());

        //Creamos el objeto ErrorMenssage y lo seteamos
        ErrorMessage errorMessage = ErrorMessage.builder()
                .code("01")
                .messages(erros).build();
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = "";
        try {
            jsonString = mapper.writeValueAsString(errorMessage);
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }
        return jsonString;
    }
}
