package com.grupo3.msvakitas;


import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.enums.VakitaTypes;
import com.grupo3.msvakitas.service.impl.UsuarioService;
import com.grupo3.msvakitas.service.impl.VakitaService;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class VakitaServiceTest {

    @Autowired
    private VakitaService vakitaService;

    @Autowired
    private UsuarioService usuarioService;


    @Test
    public void aCreateVakita() throws ResourceNotFoundException, BadRequestException {
        UserDTO user = new UserDTO(1L, "mail@elmail.com");
        UserDTO user2 = new UserDTO(2L, "mail2@elmail.com");
        UserDTO user3 = new UserDTO(3L, "mail3@elmail.com");
        UserDTO user4 = new UserDTO(4L, "mail4@elmail.com");

        usuarioService.createUser(user);
        usuarioService.createUser(user2);
        usuarioService.createUser(user3);
        usuarioService.createUser(user4);

        List<UserDTO> contributors = new ArrayList<>();
        contributors.add(user);
        contributors.add(user2);
        contributors.add(user3);
        contributors.add(user4);

        VakitaDTO vakita = new VakitaDTO(1L, "la vakita", 1L, "esto es una vakita", "esto es una url", 1000.00, 0.0, LocalDate.now(), LocalDate.now(), true, VakitaTypes.normal, contributors);
        vakitaService.createVakita(vakita);
        Assert.assertEquals(vakita.getName(), vakitaService.getVakitaById(1L).getName());

    }

    @Test
    public void bGetAllVakitas() throws ResourceNotFoundException, BadRequestException {
        UserDTO user = new UserDTO(1L, "mail@elmail.com");
        UserDTO user2 = new UserDTO(2L, "mail2@elmail.com");

        usuarioService.createUser(user);
        usuarioService.createUser(user2);

        List<UserDTO> contributors = new ArrayList<>();
        contributors.add(user);
        contributors.add(user2);

        VakitaDTO vakita = new VakitaDTO(3L, "la vakita", 1L, "esto es una vakita", "esto es una url", 1000.00, 0.0, LocalDate.now(), LocalDate.now(), false, VakitaTypes.normal, contributors);
        VakitaDTO vakita2 = new VakitaDTO(4L, "la vakita", 1L, "esto es otra vakita", "esto es una url",  10000.00, 500.0, LocalDate.now(), LocalDate.now(), true, VakitaTypes.normal, contributors);
        vakitaService.createVakita(vakita);
        vakitaService.createVakita(vakita2);
        Assert.assertTrue(vakitaService.getAllVakitas().size() == 2);


    }

    @Test
    public void cGetVakitaById() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        Assert.assertTrue(vakitaService.getVakitaById(1L).getId() != null);
    }

    @Test
    public void dGetVakitaByOwner() throws ResourceNotFoundException, BadRequestException{
        this.bGetAllVakitas();
        List<VakitaDTO> vakitasByOwner = vakitaService.getVakitasByOwner(1L);
        Assert.assertTrue(vakitasByOwner.size() == 2);

    }

    @Test
    public void eModifyAmount() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        vakitaService.modifyAmount(100.0, 1L);
        VakitaDTO vakitaModificada = vakitaService.getVakitaById(1L);
        Assertions.assertTrue(vakitaModificada.getCumulativeAmount() != 0.0);
    }

    @Test
    public void fGetVakitasActivesByOwner() throws ResourceNotFoundException, BadRequestException{
        this.bGetAllVakitas();
        Assert.assertTrue(vakitaService.getVakitasActivesByOwner(1L).size() == 1);
    }

    @Test
    public void gUpdateVakita() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        VakitaDTO vakitaModify = vakitaService.getVakitaById(1L);
        vakitaModify.setName("change");
        vakitaService.updateVakita(vakitaModify);
        Assert.assertTrue(vakitaService.getVakitaById(1L).getName().equals("change"));
    }

    @Test
    public void hCancelVakita() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        vakitaService.cancelVakita(1L);
        Assert.assertTrue(vakitaService.getVakitaById(1L).getIsActive() == false);

    }

    //TODO FIX METHOD
//    @Test
//    public void iAddContributor(){
//        UserDTO userToAdd = new UserDTO(10L, "mail10@mail.com");
//        usuarioService.createUser(userToAdd);
//        this.aCreateVakita();
//        VakitaDTO vakitaModified = vakitaService.getVakitaById(1L);
//        System.out.println(vakitaModified.getContributors());
//        vakitaService.addContributor(1L, userToAdd);
//        System.out.println("/////////////////////////////");
//        System.out.println(vakitaModified.getContributors().size());
//        Assertions.assertTrue(vakitaModified.getContributors().size()==5);
//    }

    //get vakitas by contributor

    @Test
    public void jDeleteVakita() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        vakitaService.deleteVakita(1L);
        Assert.assertTrue(vakitaService.getAllVakitas().size()==0);
    }


}



