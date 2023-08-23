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

    @Test
    public void jAddContributor() throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaDTO = vakitaService.getVakitaById(1L);
        Integer contribuyentes = vakitaDTO.getContributors().size();
        vakitaService.addContributor(1L, 10L);
        Assertions.assertTrue(vakitaService.getVakitaById(1L).getContributors().size() == (contribuyentes + 1));
    }

    @Test
    public void kGetAllByContributor() throws ResourceNotFoundException, BadRequestException {
        usuarioService.createUser(new UserDTO("user@user.com"));
        UserDTO userGenerado = usuarioService.getAllUsers().get(usuarioService.getAllUsers().size()-1);
        vakitaService.addContributor(1L, userGenerado.getId());
        Assertions.assertTrue(vakitaService.getVakitasByContributors(userGenerado.getId()).size()==1);
    }

    @Test
    public void lUpdateVakita() throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakita = new VakitaDTO("name", 1L, "descripcion", "url", 1000.0, 0.0, LocalDate.parse("2020-03-01"), LocalDate.parse("2023-02-01"), false, VakitaTypes.normal);
        vakitaService.updateVakita(7L, vakita);
        VakitaDTO vakitaModificada = vakitaService.getVakitaById(7L);
        Assertions.assertTrue(vakitaModificada.getName().equals("name"));

    }

    @Test
    public void createVakitaValidations() throws BadRequestException, ResourceNotFoundException {
        VakitaDTO vakitaDTO = new VakitaDTO("",1L,"vakita creada","www.img.com",2000.0,3000.0,LocalDate.parse("2023-09-06"),LocalDate.parse("2023-09-06"),true,VakitaTypes.normal);

        VakitaDTO vakita =vakitaService.createVakita(vakitaDTO);
        Assertions.assertTrue((vakita.getName() != null && vakita.getCumulativeAmount() >0.0 && vakita.getExpirationDate().isAfter(LocalDate.now())&&( vakita.getIdCreatorUser() != null ||!vakita.getContributors().isEmpty())));

    }

    @Test
    public void updateVakitaPartially() throws BadRequestException, ResourceNotFoundException {
        VakitaDTO vakitaDTO = new VakitaDTO("",1L,"esto es una descripcion","link",2000.0,3000.0,LocalDate.parse("2023-09-06"),LocalDate.parse("2023-09-06"),true,VakitaTypes.normal);

        VakitaDTO vakita =vakitaService.createVakita(vakitaDTO);
        VakitaDTO vakitaUpdateDes = vakitaService.partialUpdate(vakita.getId(),"descripcion","se modifico");
        VakitaDTO vakitaUpdateImg = vakitaService.partialUpdate(vakita.getId(),"imagen","imagen nueva");
        VakitaDTO vakitaUpdateDate = vakitaService.partialUpdate(vakita.getId(),"fecha-expiracion","2023-10-06");
        Assertions.assertTrue(vakita.getDescription() != vakitaUpdateDes.getDescription());
        Assertions.assertTrue(vakita.getImgURL() != vakitaUpdateImg.getImgURL());
        Assertions.assertTrue(vakita.getExpirationDate() != vakitaUpdateDate.getExpirationDate());

    }
    @Test
    public void modifyAmountVakita() throws BadRequestException, ResourceNotFoundException {
        VakitaDTO vakitaDTO = new VakitaDTO("",1L,"vakita creada","www.img.com",3000.0,2000.0,LocalDate.parse("2023-09-06"),LocalDate.parse("2023-09-06"),true,VakitaTypes.normal);

        VakitaDTO vakita =vakitaService.createVakita(vakitaDTO);
        vakitaService.modifyAmount(1000.0,vakita.getId());

        Assertions.assertTrue(vakita.getCumulativeAmount() >=  (vakita.getTotalAmount() - vakita.getCumulativeAmount()));

    }

    @Test
    public void modifyActive() throws BadRequestException, ResourceNotFoundException {
        VakitaDTO vakitaDTO = new VakitaDTO("",1L,"vakita creada","www.img.com",3000.0,2000.0,LocalDate.parse("2023-09-06"),LocalDate.parse("2023-09-06"),true,VakitaTypes.normal);

        VakitaDTO vakita =vakitaService.createVakita(vakitaDTO);
        vakitaService.inactiveVakita(vakita.getId());
        VakitaDTO vakitaId =vakitaService.getVakitaById(vakita.getId());

        Assertions.assertTrue(!vakitaId.getIsActive());

    }

    @Test
    public void addContributors() throws BadRequestException, ResourceNotFoundException {
        VakitaDTO vakitaDTO = new VakitaDTO("",1L,"vakita creada","www.img.com",3000.0,2000.0,LocalDate.parse("2023-09-06"),LocalDate.parse("2023-09-06"),true,VakitaTypes.normal);

        VakitaDTO vakita =vakitaService.createVakita(vakitaDTO);
        vakitaService.addContributor(vakita.getId(),2L);
        vakitaService.addContributor(vakita.getId(),3L);
        vakitaService.addContributor(vakita.getId(),4L);
        vakitaService.addContributor(vakita.getId(),5L);
        vakitaService.addContributor(vakita.getId(),6L);
        vakitaService.addContributor(vakita.getId(),7L);
        vakitaService.addContributor(vakita.getId(),8L);
        vakitaService.addContributor(vakita.getId(),9L);
        
        Assertions.assertTrue(vakita.getContributors().size()<=10);

    }

}



