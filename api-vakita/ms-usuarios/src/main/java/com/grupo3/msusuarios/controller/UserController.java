package com.grupo3.msusuarios.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.model.dto.AuthRequestDTO;
import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.model.dto.UserWithoutPasswordDTO;
import com.grupo3.msusuarios.service.IUserService;
import com.grupo3.msusuarios.service.impl.ConfirmationTokenService;
import com.grupo3.msusuarios.util.FormatMessage;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UserController {

    private static final Logger logg = Logger.getLogger(UserController.class);
    private final IUserService userService;
    private final ObjectMapper mapper;
    private final ConfirmationTokenService confirmationTokenService;

    //Lo inyecto para poder validar las credenciales y generar token de acceso
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(IUserService userService, ObjectMapper mapper, ConfirmationTokenService confirmationTokenService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.confirmationTokenService = confirmationTokenService;
        this.mapper = mapper;
        this.authenticationManager = authenticationManager;
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
            return ResponseEntity.status(HttpStatus.OK).body(mapper.convertValue(userDTO, UserWithoutPasswordDTO.class));
        } catch (Exception e) {
            logg.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"notice\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Busca un usuario por el email")
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        logg.info("Metodo getUserByEmail");
        try {
            UserDTO userDTO = userService.findByEmail(email);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"No se encontraron registros con ese email.\"}");
            }
            logg.info("obtained");
            return ResponseEntity.status(HttpStatus.OK).body(mapper.convertValue(userDTO, UserWithoutPasswordDTO.class));
        } catch (Exception e) {
            logg.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"notice\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Agrega un usuario")
    //TODO: AGREGO UN NOMBRE A LA RUTA PARA PODER LIBERARLA EN EL FILTERCHAIN
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {
        logg.info("Metodo createUser");
        logg.info(userDTO.toString());
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FormatMessage.formatMessage(result));
        }
        try {
            logg.info("saved");
            confirmationTokenService.sendConfirmationEmail(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado. Se ha enviado un correo de confirmación.");
        } catch (Exception e) {
            logg.error("error: "+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(hidden = true)
    @GetMapping("/confirmar")
    public ResponseEntity<?> confirmUserRegistration(@RequestParam("token") String token) {
        logg.info("Metodo confirmUserRegistration");
        try {
            logg.info("confirmed");
            confirmationTokenService.confirmUser(token);
            return ResponseEntity.status(HttpStatus.OK).body("Cuenta confirmada exitosamente.");
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

   /* METODOS DE CONTROLLER PARA SECURITY*/
    @Operation(summary = "Obtener un token")
    @PostMapping("/token")
    public ResponseEntity<?> getToken(@RequestBody AuthRequestDTO authRequestDTO) {
        String response = new String();
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword()));
            if (authenticate.isAuthenticated()) {
                response = userService.generateToken(authRequestDTO.getEmail());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        catch (Exception e){
            logg.error(e.getMessage());
            response = "Invalid Access";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @Operation(summary = "Validar un token")
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam("token") String token) {
        String response = new String();
        try {
            userService.validateToken(token);
            response = "Token is valid";
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch(Exception e) {
            logg.error(e.getMessage());
            response = "Invalid Token";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
