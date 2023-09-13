package com.grupo3.msvakitas.controller;

import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.TransactionDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.dto.VakitaPatchDTO;
import com.grupo3.msvakitas.service.impl.TransactionService;
import com.grupo3.msvakitas.service.impl.VakitaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@Slf4j
@RequestMapping("api/v1/vakita")
@SecurityRequirement(name = "bearerAuth")
public class VakitaController {

    @Autowired
    private VakitaService vakitaService;

    @Autowired
    private TransactionService tService;

    //TODO ESTA DEVOLVIENDO 200
    //CREAR UNA VAKITA
    @Operation(summary = "Crear vakita")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity create(@Valid @RequestBody VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
        vakitaService.createVakita(vakita);
        return ResponseEntity.ok().build();
    }

    //OBTENER LAS VAKITAS CREADAS POR UN USUARIO
    @Operation(summary = "Busca vakita por id de usuario")
    @GetMapping("/user/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<VakitaDTO>> getVakitasByCreator(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasByOwner(userId));

    }

    //OBTENER TODAS LAS VAKITAS(SOLO PARA USUARIO ADMIN)
    @Operation(summary = "Obtener todas las vakitas, solo usuarios admin")
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity<List<VakitaDTO>> getAllVakitas(){

        return ResponseEntity.ok(vakitaService.getAllVakitas());
    }

    //OBTENER UNA VAKITA POR ID ESPECÍFICO
    @Operation(summary = "Busca vakita por id")
    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<VakitaDTO> getVakitaById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitaById(id));
    }

    //OBTENER LA LISTA DE VAKITAS ACTIVAS POR CONTRIBUYENTE
    @Operation(summary = "Traer la lista de vakitas activas por contribuyente")
    @GetMapping("/actives/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<List<VakitaDTO>> getActivesByContributor(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasActivesByContributor(userId));
    }

    //OBTENER LA LISTA DE VAKITAS INACTIVAS POR CONTRIBUYENTE
    @Operation(summary = "Traer la lista de vakitas inactivas por contribuyente")
    @GetMapping("/inactives/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<List<VakitaDTO>> getInactivesByContributor(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasInactivesByContributor(userId));
    }

    //OBTENER LISTADO DE VAKITAS EN LAS QUE SOY CONTRIBUYENTE(LAS HAYA CREADO O NO)
    @Operation(summary = "Traer listado de vakitas en las que soy contribuyente")
    @GetMapping("/contributors/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<VakitaDTO>> getVakitasListByContributor(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasByContributors(userId));
    }

    //MODIFICAR DESCRIPCION, IMAGEN O FECHA DE EXPIRACION(ALARGAR EL PLAZO DE VENCIMIENTO)
    @Operation(summary = "Modificar descripcion, imagen o fecha de expiracion")
    @PatchMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity partialUpdateVakita(@PathVariable Long id, @RequestBody VakitaPatchDTO vakita ) throws BadRequestException, ResourceNotFoundException {
        vakitaService.partialUpdate(id, vakita.getKey(), vakita.getValue());
        return ResponseEntity.ok().build();
    }

    //ENVIAR EL DINERO AL USUARIO
    @Operation(summary = "Vaciar una vakita y enviarle el dinero al usuario")
    @PatchMapping("/drain/{vakitaId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity drainVakita(@PathVariable Long vakitaId) throws BadRequestException, ResourceNotFoundException {
        vakitaService.drainVakita(vakitaId);
        return ResponseEntity.ok().build();
    }


    //MODIFICAR TODA LA VAKITA
    @Operation(summary = "Modificar una vakita")
    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity updateVakita(@PathVariable Long id, @Valid @RequestBody VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
        vakitaService.updateVakita(id, vakita);
        return ResponseEntity.ok().build();
    }

    //DEPOSITAR DINERO EN UNA VAKITA
    @Operation(summary = "Depositar dinero en una vakita")
    @PutMapping("/deposit")
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity deposit(@RequestParam Long userId,  @RequestParam Long vakitaId, @RequestParam Double amount) throws BadRequestException, ResourceNotFoundException {
        vakitaService.modifyAmount(userId, vakitaId, amount);
        return ResponseEntity.ok().build();
    }

    //SUMAR UN USUARIO A UNA VAKITA
    @Operation(summary = "Añadir un usuario a una vakita")
    @PutMapping("/contributors/add/{vakitaId}/{userId}")
    @ResponseStatus( code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity addNewContributor(@PathVariable Long vakitaId, @PathVariable Long userId) throws BadRequestException, ResourceNotFoundException {
        vakitaService.addContributor(vakitaId, userId);
        return ResponseEntity.ok().build();
    }

    //CAMBIAR EL ESTADO DE UNA VAKITA A INACTIVO
    @Operation(summary = "Cambiar el estado de una vakita a inactivo")
    @PutMapping("/inactive/{vakitaId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity changeStateToInactive(@PathVariable Long vakitaId) throws BadRequestException, ResourceNotFoundException {
        vakitaService.inactiveVakita(vakitaId);
        return ResponseEntity.ok().build();
    }



    //BORRAR UNA VAKITA (SOLO PARA USER ADMIN) DEBERIAN PODER VACIARSE Y LUEGO QUEDAR INACTIVAS
    @Operation(summary = "Borrar una vakita")
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity deleteVakita(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        vakitaService.deleteVakita(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Filtrar las transacciones")
    @GetMapping("/transactions")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<TransactionDTO>> filterTrasactions(
             @RequestParam(required = false) Optional<Long> userId
            , @RequestParam(required = false) Optional<Long> vakitaId
            , @RequestParam(required = false) Optional<LocalDate> inicialDate
            , @RequestParam(required = false) Optional<LocalDate> finalDate) throws ResourceNotFoundException {
        List<TransactionDTO> transactionF = new ArrayList<>();
        if (vakitaId.isPresent()&&inicialDate.isPresent()&&finalDate.isPresent()){
            transactionF = tService.getTransactionsByVakitaByDate(vakitaId, inicialDate, finalDate);
        }
        else if(userId.isPresent()&&vakitaId.isPresent()) {
            transactionF = tService.getTransactionsByUserIdVakitaId(userId, vakitaId);
        }
        else if(vakitaId.isPresent()&&!(userId.isPresent())) {
            transactionF = tService.getTransactionsByVakitaId(vakitaId);
        }
        else if (userId.isPresent()&&!(vakitaId.isPresent())) {
            transactionF = tService.getTransccionsByUser(userId);
        }
        return ResponseEntity.ok(transactionF);
    }
}


