package com.grupo3.msvakitas;


import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.enums.VakitaTypes;
import com.grupo3.msvakitas.service.impl.UsuarioService;
import com.grupo3.msvakitas.service.impl.VakitaService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class VakitaServiceTest {

    @Autowired
    private VakitaService vakitaService;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    public void aCreateVakita() {

        UserDTO user = new UserDTO(1L, "elmail");
        UserDTO user2 = new UserDTO(2L, "elmail");
        usuarioService.createUser(user);
        usuarioService.createUser(user2);
        List<UserDTO> contributors = new ArrayList<>();
        contributors.add(user);
        contributors.add(user2);
        VakitaDTO vakita = new VakitaDTO(1L, "la vakita", 1L, "esto es una vakita", 1000.00, 0.0, LocalDate.now(), LocalDate.now(), true, VakitaTypes.normal, contributors);
        vakitaService.createVakita(vakita);
        Assert.assertEquals(vakita.getName(), vakitaService.getVakitaById(1L).getName());

    }

    @Test
    public void bGetAllVakitas() {
        UserDTO user = new UserDTO(1L, "elmail");
        UserDTO user2 = new UserDTO(2L, "elmail");
        usuarioService.createUser(user);
        usuarioService.createUser(user2);
        List<UserDTO> contributors = new ArrayList<>();
        contributors.add(user);
        contributors.add(user2);
        VakitaDTO vakita = new VakitaDTO(3L, "la vakita", 1L, "esto es una vakita", 1000.00, 0.0, LocalDate.now(), LocalDate.now(), true, VakitaTypes.normal, contributors);
        VakitaDTO vakita2 = new VakitaDTO(4L, "la vakita", 2L, "esto es otra vakita", 10000.00, 500.0, LocalDate.now(), LocalDate.now(), true, VakitaTypes.normal, contributors);
        vakitaService.createVakita(vakita);
        vakitaService.createVakita(vakita2);
        Assert.assertTrue(vakitaService.getAllVakitas().size() != 0);


    }

    @Test
    public void cGetVakitaById(){
        this.aCreateVakita();
        Assert.assertTrue(vakitaService.getVakitaById(1L).getId()==1);
    }

    @Test
    public void dGetVakitaByOwner(){
        this.aCreateVakita();
        List<VakitaDTO> vakitasByOwner = vakitaService.getVakitaByOwner(1L);
        Assert.assertTrue(vakitasByOwner.size() != 0);

    }

    @Test
    public void eModifyAmount(){
        this.aCreateVakita();
        vakitaService.modifyAmount(100.0, 1L);
        VakitaDTO vakitaModificada = vakitaService.getVakitaById(1L);
        Assert.assertTrue(vakitaModificada.getCumulativeAmount() != 0.0);
    }

    @Test
    public void fGetVakitasActives(){
        this.bGetAllVakitas();
        Assert.assertTrue(vakitaService.getVakitasActives().size() != 0);
    }

    @Test
    public void gUpdateVakita(){
        this.aCreateVakita();
        VakitaDTO vakitaModify = vakitaService.getVakitaById(1L);
        vakitaModify.setName("change");
        vakitaService.updateVakita(vakitaModify);
        Assert.assertTrue(vakitaService.getVakitaById(1L).getName().equals("change"));
    }

    @Test
    public void hCancelVakita(){
        this.aCreateVakita();
        vakitaService.cancelVakita(1L);
        Assert.assertTrue(vakitaService.getVakitaById(1L).getIsActive() == false);

    }


}



