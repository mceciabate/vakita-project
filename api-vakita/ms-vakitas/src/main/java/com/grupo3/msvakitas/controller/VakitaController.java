package com.grupo3.msvakitas.controller;

import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.service.impl.VakitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/vakita")
public class VakitaController {

    @Autowired
    private VakitaService vakitaService;

    //TODO ESTA DEVOLVIENDO 200
    //CREAR UNA VAKITA
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity create(@Valid @RequestBody VakitaDTO vakita) throws BadRequestException {
        vakitaService.createVakita(vakita);
        return ResponseEntity.ok().build();
    }

    //OBTENER LAS VAKITAS CREADAS POR UN USUARIO
    @GetMapping("/user/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<VakitaDTO>> getVakitasByCreator(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasByOwner(userId));

    }

    //OBTENER TODAS LAS VAKITAS(SOLO PARA USUARIO ADMIN)
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity<List<VakitaDTO>> getAllVakitas(){
        return ResponseEntity.ok(vakitaService.getAllVakitas());
    }

    //OBTENER UNA VAKITA POR ID ESPECÍFICO
    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<VakitaDTO> getVakitaById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitaById(id));
    }

    //OBTENER LAS VAKITAS ACTIVAS POR ID DEL CREADOR
    @GetMapping("/actives/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<List<VakitaDTO>> getVakitasActivesByCreator(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasByOwner(userId));
    }

    //OBTENER LISTADO DE VAKITAS EN LAS QUE SOY CONTRIBUYENTE(LAS HAYA CREADO O NO)
    @GetMapping("/contributors/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<VakitaDTO>> getVakitasListByContributor(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasByContributors(userId));
    }

    //MODIFICAR DESCRIPCION, IMAGEN O FECHA DE EXPIRACION(ALARGAR EL PLAZO DE VENCIMIENTO)
    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity updateVakita(@PathVariable Long id, @Valid @RequestBody VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
        vakitaService.updateVakita(id, vakita);
        return ResponseEntity.ok().build();
    }

    //DEPOSITAR DINERO EN UNA VAKITA
    @PutMapping("/deposit")
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity deposit(@RequestParam Double amount, @RequestParam Long vakitaId) throws BadRequestException, ResourceNotFoundException {
        vakitaService.modifyAmount(amount, vakitaId);
        return ResponseEntity.ok().build();
    }

    //SUMAR UN USUARIO A UNA VAKITA
    @PutMapping("/contributors/add/{vakitaId}/{userId}")
    @ResponseStatus( code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity addNewContributor(@PathVariable Long vakitaId, @PathVariable Long userId) throws BadRequestException, ResourceNotFoundException {
        vakitaService.addContributor(vakitaId, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/inactive/{vakitaId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity changeStateToInactive(@PathVariable Long vakitaId) throws BadRequestException, ResourceNotFoundException {
        vakitaService.inactiveVakita(vakitaId);
        return ResponseEntity.ok().build();
    }



    //BORRAR UNA VAKITA (SOLO PARA USER ADMIN) DEBERIAN PODER VACIARSE Y LUEGO QUEDAR INACTIVAS
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity deleteVakita(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        vakitaService.deleteVakita(id);
        return ResponseEntity.ok().build();
    }




}


