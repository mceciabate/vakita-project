package com.grupo3.msusuarios.controller;

import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.service.IUserService;
import com.grupo3.msusuarios.util.FormatMessage;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UserController {

    private static final Logger logg = Logger.getLogger(UserController.class);
    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Busca todos los registros de usuarios")
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        logg.info("Metodo getAllUsers");
        try {
            logg.info("obtained");
            return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
        } catch (Exception e) {
            logg.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"notice\":\"Notice. No se encontraron registros.\"}");
        }
    }

    @Operation(summary = "Busca un usuario por el id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        logg.info("Metodo getUserById");
        try {
            UserDTO userDTO = userService.findById(id);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"No se encontraron registros con ese ID.\"}");
            }
            logg.info("obtained");
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            logg.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"notice\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Agrega un usuario")
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {
        logg.info("Metodo createUser");
        logg.info(userDTO.toString());
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FormatMessage.formatMessage(result));
        }
        try {
            logg.info("saved");
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userDTO));
        } catch (Exception e) {
            logg.error("error: "+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Actualiza un usuario por el id")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO, BindingResult result) {
        logg.info("Metodo updateUserById");
        logg.info(userDTO.toString());
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FormatMessage.formatMessage(result));
        }
        try {
            if (!userDTO.getId().equals(id)) {
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "{\"error\":\"Los Ids no coinciden\"}");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Los Ids no coinciden\"}");
            }
            UserDTO findUserDTO = userService.findById(id);
            if (findUserDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"No se encontraron registros con ese ID.\"}");
            }
            logg.info("updated");
            return ResponseEntity.status(HttpStatus.OK).body(userService.updateById(id, userDTO));
        } catch (Exception e) {
            logg.error("error: "+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Actualiza password del usuario por el id")
    @PatchMapping("/{id}")
    public ResponseEntity<?> changeUserPasswordById(@PathVariable Long id, @Valid @RequestBody UserDTO newPassword, BindingResult result) {
        logg.info("Metodo changeUserPasswordById");
        logg.info(newPassword);
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FormatMessage.formatMessage(result));
        }
        try {
            boolean changePassword = userService.changePassword(id, newPassword.getPassword());
            if (!changePassword) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"No se encontraron registros con ese ID.\"}");
            } else {
                logg.info("updated");
                return ResponseEntity.status(HttpStatus.OK).body(changePassword);
            }
        } catch (Exception e) {
            logg.error("error: "+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Elimina un usuario por el id")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
        logg.info("Metodo deleteUserById");
        try {
            UserDTO userDTO = userService.findById(id);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"No se encontraron registros con ese ID.\"}");
            }
            logg.info("deleted");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userService.deleteById(id));
        } catch (Exception e) {
            logg.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }
    }
}
