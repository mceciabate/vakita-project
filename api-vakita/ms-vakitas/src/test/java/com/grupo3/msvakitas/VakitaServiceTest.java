package com.grupo3.msvakitas;


import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
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

import static org.junit.jupiter.api.Assertions.assertThrows;


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
    public void aaTesteandoDataSource() throws ResourceNotFoundException {
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
    public void iDeleteVakita() throws ResourceNotFoundException , BadRequestException {
        VakitaDTO vakitaParaBorrar = null;
        List<VakitaDTO> listVakitas = vakitaService.getAllVakitas();
        for (VakitaDTO vakitaDTO : listVakitas) {
            if(vakitaDTO.getCumulativeAmount() == 0){
                vakitaParaBorrar = vakitaDTO;
                break;
            }
        }
        vakitaService.inactiveVakita(vakitaParaBorrar.getId());
        vakitaService.deleteVakita(vakitaParaBorrar.getId());
        VakitaDTO finalVakitaParaBorrar = vakitaParaBorrar;
        ResourceNotFoundException thrown = assertThrows(
                ResourceNotFoundException.class, () -> vakitaService.getVakitaById(finalVakitaParaBorrar.getId()), "Vakita borrada");
        System.out.println(thrown.getMessage());
        Assertions.assertTrue(thrown.getMessage().contains("No se encuentra la vakita con id: " + finalVakitaParaBorrar.getId()));
    }

//    @Test
//    public void jGetAllByContributor() throws ResourceNotFoundException, BadRequestException {
//        VakitaDTO vakitaDTO = vakitaService.getVakitaById(1L);
//        Integer contribuyentes = vakitaDTO.getContributors().size();
//        System.out.println(contribuyentes);
//        vakitaService.addContributor(vakitaDTO.getId(), 10L);
//        System.out.println(vakitaDTO.getContributors().size());
//        Assertions.assertTrue(vakitaDTO.getContributors().equals(contribuyentes + 1));
//    }
//
//    @Test
//    public void kAddContributor() throws ResourceNotFoundException, BadRequestException {
//        vakitaService.addContributor(5L, 10L);
//        VakitaDTO vakitaDTO = vakitaService.getVakitaById(5L);
//        Assertions.assertTrue(vakitaDTO.getContributors().contains(usuarioService.getUserById(5L)));
//    }

//    @Test
//    public void lUpdateVakita() throws ResourceNotFoundException, BadRequestException {
//        VakitaDTO vakitaUpdate = vakitaService.getVakitaById(7L);
//        VakitaDTO vakita = new VakitaDTO("name", 1L, "descripcion", "url", 1000.0, 0.0, LocalDate.parse("2020-03-01"), LocalDate.parse("2023-02-01"), false, VakitaTypes.normal);
//        vakitaService.updateVakita(7L, vakita);
//        Assertions.assertTrue(vakitaService.getVakitaById(7L).getName().equals(vakita.getName()));
//
//    }

}



