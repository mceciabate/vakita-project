package com.grupo3.msvakitas.controller;

import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.dto.VakitaPatchDTO;
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
    public ResponseEntity create(@Valid @RequestBody VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
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

    //OBTENER LA LISTA DE VAKITAS ACTIVAS POR CONTRIBUYENTE
    @GetMapping("/actives/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<List<VakitaDTO>> getActivesByContributor(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasActivesByContributor(userId));
    }

    //OBTENER LISTADO DE VAKITAS EN LAS QUE SOY CONTRIBUYENTE(LAS HAYA CREADO O NO)
    @GetMapping("/contributors/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<VakitaDTO>> getVakitasListByContributor(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitasByContributors(userId));
    }

    //MODIFICAR DESCRIPCION, IMAGEN O FECHA DE EXPIRACION(ALARGAR EL PLAZO DE VENCIMIENTO)
    @PatchMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity partialUpdateVakita(@PathVariable Long id, @RequestBody VakitaPatchDTO vakita ) throws BadRequestException, ResourceNotFoundException {
        vakitaService.partialUpdate(id, vakita.getKey(), vakita.getValue());
        return ResponseEntity.ok().build();
    }

    //MODIFICAR TODA LA VAKITA
    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('ADMIN')")
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

    //CAMBIAR EL ESTADO DE UNA VAKITA A INACTIVO
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


