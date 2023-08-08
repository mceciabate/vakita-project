package com.grupo3.msusuarios.service;

import com.grupo3.msusuarios.model.dto.UserDTO;
import org.apache.log4j.Logger;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserServiceTest {

    @Autowired
    private IUserService userService;
    private UserDTO userDTOTest1;
    private UserDTO userDTOTest2;

    @BeforeEach
    public void setUp() {
        userDTOTest1 = new UserDTO();
        userDTOTest1.setId(1L);
        userDTOTest1.setName("Prueba1");
        userDTOTest1.setLastName("Prueba1");
        userDTOTest1.setBirthdate(LocalDate.parse("2023-08-04"));
        userDTOTest1.setDni("11111111");
        userDTOTest1.setEmail("prueba1@Test.com");
        userDTOTest1.setPassword("1234test");
    }

    @Test
    public void saveTest(){
        try {
            UserDTO userDTOSave = userService.save(userDTOTest1);
            Assertions.assertNotNull(userDTOSave);
            Assertions.assertEquals("Prueba1", userDTOSave.getName());
        }catch (Exception e){
            e.getMessage();
        }
    }

    @Test
    void findByIdTest(){
        try {
            Assertions.assertEquals("Prueba1", userService.findById(1L).getName());
            Assertions.assertNull(userService.findById(99L));
        }catch (Exception e){
            e.getMessage();
        }
    }

    @Test
    void updateByIdTest(){
        try {
            userDTOTest1.setName("Prueba1MOD");
            UserDTO userDTO = userService.updateById(1L, userDTOTest1);
            Assertions.assertEquals("Prueba1MOD", userDTO.getName());
        }catch (Exception e){
            e.getMessage();
        }
    }

    @Test
    void changePasswordTest(){
        try {
            userService.changePassword(1L, "1234NewPassword");
            Assertions.assertEquals("1234NewPassword", userService.findById(1L).getPassword());
        }catch (Exception e){
            e.getMessage();
        }
    }

    @Test
    void deleteByIdTest(){
        try {
            userService.deleteById(1L);
            Assertions.assertNull(userService.findById(1L));
        }catch (Exception e){
            e.getMessage();
        }
    }

    @Test
    void findAllTest(){
        try {
            userDTOTest2 = new UserDTO();
            userDTOTest2.setId(2L);
            userDTOTest2.setName("Prueba2");
            userDTOTest2.setLastName("Prueba2");
            userDTOTest2.setBirthdate(LocalDate.parse("2023-08-04"));
            userDTOTest2.setDni("22222222");
            userDTOTest2.setEmail("prueba2@Test.com");
            userDTOTest2.setPassword("1234test");
            userService.save(userDTOTest1);
            userService.save(userDTOTest2);
            Assertions.assertEquals(2, userService.findAll().size());
        }catch (Exception e){
            e.getMessage();
        }
    }
}
