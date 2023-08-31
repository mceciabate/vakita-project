package com.grupo3.msusuarios.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.model.entity.ConfirmationToken;
import com.grupo3.msusuarios.repository.ConfirmationTokenRepository;
import com.grupo3.msusuarios.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ConfirmationTokenService {


    private final ConfirmationTokenRepository tokenRepository;
    private final EmailService emailService;
    private final IUserService userService;
    private final ObjectMapper mapper;
    private final PasswordEncoder encoder;

    @Autowired
    public ConfirmationTokenService(ConfirmationTokenRepository tokenRepository, EmailService emailService, IUserService userService, ObjectMapper mapper, PasswordEncoder encoder) {
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.userService = userService;
        this.mapper = mapper;
        this.encoder = encoder;
    }

    public boolean sendConfirmationEmail(UserDTO userDTO) throws Exception {
        try {
            UserDTO validation = userService.findByEmail(userDTO.getEmail());
            if (validation != null){
                return false;
            }
            else {
                String encoderPass = this.encoder.encode(userDTO.getPassword());
                ConfirmationToken token = new ConfirmationToken();
                token.setUserName(userDTO.getName());
                token.setUserLastName(userDTO.getLastName());
                token.setUserDni(userDTO.getDni());
                token.setUserEmail(userDTO.getEmail());
                token.setUserPassword(encoderPass);
                token.setUserBirthdate(userDTO.getBirthdate());
                token.setAccount_balance(userDTO.getAccount_balance());
                token.setToken(UUID.randomUUID().toString());
                token.setExpirationDate(LocalDateTime.now().plusDays(1));
                tokenRepository.save(token);

                String subject = "Confirmación de Registro";


//                String body = "Haz clic en el siguiente enlace para confirmar tu cuenta: http://localhost:8080/api/v1/usuarios/confirmar?token=" + token.getToken();
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
                        "      <h2 style=\"margin-left: 50px; display: inline;\">Haz clic en el siguiente enlace para confirmar tu cuenta:</h2>\n" +
                        "      <a style=\"margin-left: 50px; font-size: 20px;\" href=\"http://107.22.65.36:8080/api/v1/usuarios/confirmar?token=" + token.getToken() +"\">Link</a>\n" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "</body>\n" +
                        "</html>";


                emailService.sendEmail(userDTO.getEmail(), subject, body);
                return true;
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public void confirmUser(String token) throws Exception {
        try {
            ConfirmationToken confirmationToken = tokenRepository.findByToken(token);
            if (confirmationToken != null && confirmationToken.getExpirationDate().isAfter(LocalDateTime.now())) {
                UserDTO userDTO = new UserDTO();
                userDTO.setName(confirmationToken.getUserName());
                userDTO.setLastName(confirmationToken.getUserLastName());
                userDTO.setDni(confirmationToken.getUserDni());
                userDTO.setEmail(confirmationToken.getUserEmail());
                userDTO.setPassword(confirmationToken.getUserPassword());
                userDTO.setBirthdate(confirmationToken.getUserBirthdate());
                userService.save(userDTO);
                tokenRepository.deleteById(confirmationToken.getId());
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
