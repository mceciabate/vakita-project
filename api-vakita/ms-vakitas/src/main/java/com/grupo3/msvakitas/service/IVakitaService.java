package com.grupo3.msvakitas.service;

import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.VakitaDTO;

import java.util.List;

public interface IVakitaService {

    //read
    List<VakitaDTO> getAllVakitas();
    VakitaDTO getVakitaById(Long id) throws ResourceNotFoundException;
    List<VakitaDTO> getVakitasByOwner(Long id) throws ResourceNotFoundException;
    List<VakitaDTO> getVakitasActivesByContributor(Long userId) throws ResourceNotFoundException;
    List<VakitaDTO> getVakitasByContributors(Long userId) throws ResourceNotFoundException, BadRequestException;

    //create
    VakitaDTO createVakita(VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException;

    //update
    void modifyAmount(Double amount, Long id) throws ResourceNotFoundException, BadRequestException;

    //Este método es para actualizar una vakita existente
    VakitaDTO updateVakita(Long id, VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException;

    VakitaDTO partialUpdate(Long id, String key, String value) throws ResourceNotFoundException, BadRequestException;

    void addContributor(Long id, Long userId) throws ResourceNotFoundException, BadRequestException;
    void inactiveVakita(Long id) throws ResourceNotFoundException, BadRequestException;

    //delete
    void deleteVakita(Long id) throws ResourceNotFoundException, BadRequestException;









}
