package com.grupo3.msvakitas;


import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.enums.VakitaTypes;
import com.grupo3.msvakitas.service.impl.VakitaService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;

@SpringBootTest
public class VakitaServiceTest {

    @Autowired
    private VakitaService vakitaService;

    @Test
    public void aCreateVakita() {

        UserDTO user = new UserDTO(1L, "elmail");
        ArrayList<UserDTO> contributors = new ArrayList<>();
        contributors.add(user);
        VakitaDTO vakita = new VakitaDTO(1L, "la vakita", 1L, "esto es una vakita", 1000.00, 0.0, LocalDate.now(), LocalDate.now(), true, VakitaTypes.normal, contributors);
        vakitaService.createVakita(vakita);
        Assert.assertEquals(vakita.getName(), vakitaService.getVakitaById(1L).getName());

    }

    @Test
    public void bGetAllVakitas() {

    }


}



