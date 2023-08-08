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
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDate;
import java.util.List;


@SpringBootTest
@AutoConfigureTestDatabase
@Sql(scripts = { "/insert_data2.sql" })
@TestMethodOrder(MethodOrderer.MethodName.class)
public class VakitaServiceTest {

    @Autowired
//    @Qualifier("vakitaService")
    private VakitaService vakitaService;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    public void testeandoDataSource() throws ResourceNotFoundException {
        Assertions.assertTrue(usuarioService.getUserById(1L).getEmail().equals("cecilia@micorreo.com"));
        Assert.assertTrue(vakitaService.getAllVakitas().size() > 0);
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
        Assert.assertFalse(vakitaService.getAllVakitas().isEmpty());


    }

    @Test
    public void cGetVakitaById() throws ResourceNotFoundException, BadRequestException{
        Assert.assertTrue(vakitaService.getVakitaById(1L).getId() != null);
    }

    @Test
    public void dGetVakitaByOwner() throws ResourceNotFoundException, BadRequestException{
        List<VakitaDTO> vakitasByOwner = vakitaService.getVakitasByOwner(1L);
        Assert.assertFalse(vakitasByOwner.isEmpty());

    }

    @Test
    public void eModifyAmount() throws ResourceNotFoundException, BadRequestException{
        vakitaService.modifyAmount(100.0, 1L);
        VakitaDTO vakitaModificada = vakitaService.getVakitaById(1L);
        Assertions.assertTrue(vakitaModificada.getCumulativeAmount().equals(100.0));
    }

    @Test
    public void fInactiveVakita() throws BadRequestException, ResourceNotFoundException {
        vakitaService.inactiveVakita(4L);
        Assertions.assertTrue(vakitaService.getVakitaById(4L).getIsActive().equals(false));
    }

    @Test
    public void fGetVakitasActivesByContributor() throws ResourceNotFoundException, BadRequestException{
        Assert.assertTrue(vakitaService.getVakitasActivesByContributor(10L).size() > 1);
    }


    @Test
    public void gPartialUpdateVakita() throws ResourceNotFoundException, BadRequestException{
        String value = "imagen_modificada";
        String key = "imagen";
        vakitaService.partialUpdate(4L, key, value);
        Assertions.assertTrue(vakitaService.getVakitaById(4L).getImgURL().equals(value));
    }

    @Test
    public void hInactiveVakita() throws ResourceNotFoundException, BadRequestException{
        vakitaService.inactiveVakita(10L);
        Assert.assertTrue(vakitaService.getVakitaById(10L).getIsActive() == false);

    }


    @Test
    public void iDeleteVakita() throws ResourceNotFoundException, BadRequestException{
        vakitaService.inactiveVakita(1L);
        vakitaService.deleteVakita(1L);
        Assertions.assertNull(vakitaService.getVakitaById(1L));
    }

    @Test
    public void jGetAllByContributor() throws ResourceNotFoundException {
        List<VakitaDTO> getAllByC = vakitaService.getVakitasByContributors(3L);
        Assertions.assertTrue(getAllByC.size() == 3);
    }

    @Test
    public void kAddContributor() throws ResourceNotFoundException, BadRequestException {
        vakitaService.addContributor(5L, 10L);
        VakitaDTO vakitaDTO = vakitaService.getVakitaById(5L);
        Assertions.assertTrue(vakitaDTO.getContributors().contains(usuarioService.getUserById(5L)));
    }

    @Test
    public void lUpdateVakita() throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaUpdate = vakitaService.getVakitaById(7L);
        String name = "Name modificado";
        Long idCreator = vakitaUpdate.getIdCreatorUser();
        String description = "se cambio la descripcion";
        String img = "nueva Url";
        Double total = 5000.0;
        LocalDate dateCreation = vakitaUpdate.getCreationDate();
        LocalDate dateExpiration = LocalDate.parse("2024-07-13");
        Boolean active = false;
        Enum<VakitaTypes> type = VakitaTypes.normal;
        List<UserDTO> contributors = vakitaUpdate.getContributors();
        vakitaService.updateVakita(7L, vakitaUpdate);
        Assertions.assertTrue(vakitaService.getVakitaById(7L).equals(vakitaUpdate));

    }

}



