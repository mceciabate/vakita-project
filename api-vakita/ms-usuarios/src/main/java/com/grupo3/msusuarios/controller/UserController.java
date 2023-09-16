package com.grupo3.msusuarios.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.model.dto.*;
import com.grupo3.msusuarios.service.IUserService;
import com.grupo3.msusuarios.service.impl.ConfirmationTokenService;
import com.grupo3.msusuarios.service.impl.EmailService;
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

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UserController {

    private static final Logger logg = Logger.getLogger(UserController.class);
    private final IUserService userService;
    private final ObjectMapper mapper;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;

    //Lo inyecto para poder validar las credenciales y generar token de acceso
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(IUserService userService, ObjectMapper mapper, ConfirmationTokenService confirmationTokenService, AuthenticationManager authenticationManager, EmailService emailService) {
        this.userService = userService;
        this.confirmationTokenService = confirmationTokenService;
        this.mapper = mapper;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(FormatMessage.formatMessage(result));
        }
        try {
            logg.info("saved");

            if (userService.findByDni(userDTO.getDni()) != null){
                logg.error("error: dni ya registrado");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. El dni ya se encuentra registrado.\"}");
            }

            boolean response = confirmationTokenService.sendConfirmationEmail(userDTO);
            if (response) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado. Se ha enviado un correo de confirmación.");
            }
            else {
                logg.error("error: email duplicado");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. El email ya se encuentra registrado.\"}");
            }
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
            return ResponseEntity.status(HttpStatus.OK).body("<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Account Created</title>\n" +
                    "    <style>\n" +
                    "        .header {\n" +
                    "          width: 100%;\n" +
                    "          height: 100px;\n" +
                    "          display: flex;\n" +
                    "          align-items: center;\n" +
                    "          justify-content: space-between;\n" +
                    "          background: linear-gradient(0deg, #664e94 10%, #423163 90%);\n" +
                    "          position: sticky;\n" +
                    "          z-index: 999;\n" +
                    "          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.20); \n" +
                    "        }\n" +
                    "        .body {\n" +
                    "          width: 100%;\n" +
                    "          height: 100vh;\n" +
                    "          display: flex;\n" +
                    "          justify-content: center;\n" +
                    "          align-items: center;\n" +
                    "          background: linear-gradient(0deg, rgba(200,185,224,1) 11%, rgba(217,181,195,1) 89%);\n" +
                    "        }\n" +
                    "        .container{\n" +
                    "          height: 300px;\n" +
                    "          margin-top: -8px;\n" +
                    "          width: 50%;\n" +
                    "          display: flex;\n" +
                    "          font-family: 'Inria Sans';\n" +
                    "          justify-content: center;\n" +
                    "          align-items: center;\n" +
                    "          flex-direction: column;\n" +
                    "          background: linear-gradient(0deg, #EEE9FF 6%, #FCE8E9 91%);\n" +
                    "          border-radius:50px;\n" +
                    "          margin-bottom: 100px;\n" +
                    "        }\n" +
                    "      </style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"header\"></div>\n" +
                    "  <div class=\"body\">\n" +
                    "    <div class=\"container\">\n" +
                    "      <h1>Cuenta confirmada exitosamente!</h1>\n" +
                    "      <a style=\"text-decoration: none;\" href=\"http://54.221.139.107/\"><h2>Ir al login</h2></a>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</body>\n" +
                    "</html>");
        } catch (Exception e) {
            logg.error("error: "+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }

    @Operation(summary = "Actualiza un usuario por el id")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO userDTO, BindingResult result) {
        logg.info("Metodo updateUserById");
        logg.info(userDTO.toString());
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(FormatMessage.formatMessage(result));
        }
        try {
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
    public ResponseEntity<?> changeUserPasswordById(@PathVariable Long id, @Valid @RequestBody UserPasswordDTO newPassword, BindingResult result) {
        logg.info("Metodo changeUserPasswordById");
        logg.info(newPassword);
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(FormatMessage.formatMessage(result));
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
    public ResponseEntity<?> getToken(@RequestBody AuthRequestDTO authRequestDTO) throws Exception {
        AuthResponseDTO response = new AuthResponseDTO();
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword()));
            if (authenticate.isAuthenticated()) {
                response = userService.generateToken(authRequestDTO.getEmail());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        catch (Exception e){
            logg.error(e.getMessage());
            response.setUserId(userService.findByEmail(authRequestDTO.getEmail()).getId());
            response.setToken("Invalid Access");
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

    @Operation(summary = "Enviar un email al usuario para restablecer password")
    @PostMapping("/recover")
    public ResponseEntity<?> recoverUserPassword(@Valid @RequestBody UserEmailDTO userEmailDTO, BindingResult result) {
        logg.info("Metodo recoverUserPassword");
        logg.info(userEmailDTO.toString());
        if (result.hasErrors()) {
            logg.error("error: "+ FormatMessage.formatMessage(result));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(FormatMessage.formatMessage(result));
        }
        try {
            if (userService.findByEmail(userEmailDTO.getEmail()) == null){
                logg.error("error: email no registrado");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. El email no se encuentra registrado.\"}");
            }
            else {
                logg.info("sending email");
                String token = UUID.randomUUID().toString();
                String subject = "Restablecer contraseña";
                String body = "<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        "    <title>Account Created</title>\n" +
                        "    <style>\n" +
                        "        .header {\n" +
                        "          width: 50%;\n" +
                        "          height: 50px;\n" +
                        "          display: flex;\n" +
                        "          align-items: center;\n" +
                        "          justify-content: space-between;\n" +
                        "          background: linear-gradient(0deg, #664e94 10%, #423163 90%);\n" +
                        "          position: sticky;\n" +
                        "          z-index: 999;\n" +
                        "          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.20); \n" +
                        "        }\n" +
                        "        .body {\n" +
                        "          width: 50%;\n" +
                        "          height: 30vh;\n" +
                        "          display: flex;\n" +
                        "          background: linear-gradient(0deg, rgba(200,185,224,1) 11%, rgba(217,181,195,1) 89%);\n" +
                        "        }\n" +
                        "        .container{\n" +
                        "          height: 150px;\n" +
                        "          width: 100%;\n" +
                        "          margin-top: 40px;\n" +
                        "          padding-left: 10px;\n" +
                        "          padding-bottom: 10px;\n" +
                        "          font-family: 'Inria Sans';\n" +
                        "          background: linear-gradient(0deg, #EEE9FF 6%, #FCE8E9 91%);\n" +
                        "          border-radius:20px;\n" +
                        "        }\n" +
                        "      </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "    <div class=\"header\"></div>\n" +
                        "  <div class=\"body\">\n" +
                        "    <div class=\"container\">\n" +
                        "      <br>\n" +
                        "      <br>\n" +
                        "      <br>\n" +
                        "      <h2 style=\"margin-left: 50px; display: inline;\">Copia el siguiente token para restablecer tu contraseña:</h2>\n" +
                        "      <br>\n" +
                        "      <br>\n" +
                        "      <h3 style=\"margin-left: 100px; color: blue; display: inline;\">" + token + "</h3>\n" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "</body>\n" +
                        "</html>";

                emailService.sendEmail(userEmailDTO.getEmail(), subject, body);
                return ResponseEntity.status(HttpStatus.OK).body("{\n" +
                        "  \"message\": \"Usuario encontrado. Se ha enviado un correo para restablecer la contraseña.\",\n" +
                        "  \"token\": \"" + token + "\"\n" +
                        "}");
            }
        } catch (Exception e) {
            logg.error("error: "+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor, intente mas tarde.\"}");
        }
    }
    @Operation(summary = "Modificar saldo de un usuario")
    @PostMapping("/balance")
    public ResponseEntity<?> modifyAcountBalance(@RequestParam Long userId, @RequestParam Double amount) {
        String response = new String();
        try {
            userService.updateAccountBalanceFromClient(userId, amount);
            response = "Success!Update AccountBalance";
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch(Exception e) {
            logg.error(e.getMessage());
            response = "Error: insufficient balance. Please check values";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
