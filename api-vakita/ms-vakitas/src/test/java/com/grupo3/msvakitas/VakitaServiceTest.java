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
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
@AutoConfigureTestDatabase
@Sql(scripts = { "/insert_data2.sql" })
public class VakitaServiceTest {

    @Autowired
//    @Qualifier("vakitaService")
    private VakitaService vakitaService;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    public void testeandoDataSource() throws ResourceNotFoundException {
        Assertions.assertTrue(usuarioService.getUserById(1L).getEmail().equals("cecilia@micorreo.com"));
        Assert.assertTrue(vakitaService.getAllVakitas().size()==0);
    }


    @Test
    public void aCreateVakita() throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakita = new VakitaDTO(
                "the cow",
                1L,
                "la descripción",
                "url",
                1000.0,
                0.0,
                LocalDate.now(),
                LocalDate.parse("2023-12-01"),
                true,
                VakitaTypes.normal);

        vakitaService.createVakita(vakita);
        List<VakitaDTO> todasLasVakitas = vakitaService.getAllVakitas();
        VakitaDTO vakitaCreada = todasLasVakitas.get(todasLasVakitas.size() - 1);
        Assert.assertEquals(vakita.getName(), vakitaCreada.getName());

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

        VakitaDTO vakita = new VakitaDTO(3L, "la vakita", 1L, "esto es una vakita", "esto es una url", 1000.00, 0.0, LocalDate.now(), LocalDate.parse("2023-12-01"), false, VakitaTypes.normal, contributors);
        VakitaDTO vakita2 = new VakitaDTO(4L, "la vakita", 1L, "esto es otra vakita", "esto es una url",  10000.00, 500.0, LocalDate.now(), LocalDate.parse("2023-12-01"), true, VakitaTypes.normal, contributors);
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
        Assertions.assertTrue(vakitaModificada.getCumulativeAmount().equals(100.0));
    }

    @Test
    public void fGetVakitasActivesByOwner() throws ResourceNotFoundException, BadRequestException{
        this.bGetAllVakitas();
        Assert.assertTrue(vakitaService.getVakitasActivesByContributor(1L).size() == 1);
    }

//    @Test
//    public void gUpdateVakita() throws ResourceNotFoundException, BadRequestException{
//        this.aCreateVakita();
//        VakitaDTO vakitaModify = vakitaService.getVakitaById(1L);
//        vakitaModify.setName("change");
//        vakitaService.updateVakita(vakitaModify);
//        Assert.assertTrue(vakitaService.getVakitaById(1L).getName().equals("change"));
//    }

    @Test
    public void hCancelVakita() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        vakitaService.inactiveVakita(1L);
        Assert.assertTrue(vakitaService.getVakitaById(1L).getIsActive() == false);

    }

    //TODO FIX METHOD
//    @Test
//    public void iAddContributor() throws BadRequestException, ResourceNotFoundException {
//        UserDTO userToAdd = new UserDTO(10L, "mail10@mail.com");
//        usuarioService.createUser(userToAdd);
//        this.aCreateVakita();
//        VakitaDTO vakitaModified = vakitaService.getVakitaById(1L);
//        System.out.println(vakitaModified.getContributors());
//        vakitaService.addContributor(1L, userToAdd);
//        System.out.println("/////////////////////////////");
//        System.out.println(vakitaModified.getContributors().size());
//        Assertions.assertTrue(vakitaModified.getContributors().size()==2);
//    }

    //get vakitas by contributor

    @Test
    public void jDeleteVakita() throws ResourceNotFoundException, BadRequestException{
        this.aCreateVakita();
        vakitaService.deleteVakita(1L);
        Assert.assertTrue(vakitaService.getAllVakitas().size()==0);
    }


}



