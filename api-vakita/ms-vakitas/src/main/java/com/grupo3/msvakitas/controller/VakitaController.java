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

    @PostMapping
    //TODO ESTA DEVOLVIENDO 200
    @ResponseStatus(code = HttpStatus.CREATED)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity create(@Valid @RequestBody VakitaDTO vakita) throws BadRequestException {
        vakitaService.createVakita(vakita);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    //    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity<List<VakitaDTO>> getAllVakitas(){
        return ResponseEntity.ok(vakitaService.getAllVakitas());
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity<VakitaDTO> getVakitaById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(vakitaService.getVakitaById(id));
    }

    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('USER')")
    public ResponseEntity updateVakita(@PathVariable Long id, @RequestBody VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
        vakitaService.updateVakita(id, vakita);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
//    @PreAuthorized("hasRole('ADMIN')")
    public ResponseEntity deleteVakita(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        vakitaService.deleteVakita(id);
        return ResponseEntity.ok().build();
    }




}


