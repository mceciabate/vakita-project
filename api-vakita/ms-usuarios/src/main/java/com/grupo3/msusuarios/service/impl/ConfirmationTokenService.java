package com.grupo3.msusuarios.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo3.msusuarios.model.dto.UserDTO;
import com.grupo3.msusuarios.model.entity.ConfirmationToken;
import com.grupo3.msusuarios.repository.ConfirmationTokenRepository;
import com.grupo3.msusuarios.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void sendConfirmationEmail(UserDTO userDTO) throws Exception {
        try {
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
            String body = "Haz clic en el siguiente enlace para confirmar tu cuenta: http://localhost:8080/api/v1/usuarios/confirmar?token=" + token.getToken();

            emailService.sendEmail(userDTO.getEmail(), subject, body);
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
