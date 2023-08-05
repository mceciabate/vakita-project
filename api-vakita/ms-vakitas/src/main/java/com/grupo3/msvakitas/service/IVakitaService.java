package com.grupo3.msvakitas.service;

import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;

import java.util.List;

public interface IVakitaService {

    //read
    List<VakitaDTO> getAllVakitas();
    VakitaDTO getVakitaById(Long id) throws ResourceNotFoundException;
    List<VakitaDTO> getVakitasByOwner(Long id) throws ResourceNotFoundException;
    List<VakitaDTO> getVakitasActivesByOwner(Long id) throws ResourceNotFoundException;
    List<VakitaDTO> getVakitasByContributors(String email) throws ResourceNotFoundException, BadRequestException;

    //create
    VakitaDTO createVakita(VakitaDTO vakita) throws BadRequestException;

    //update
    void modifyAmount(Double amount, Long id) throws ResourceNotFoundException, BadRequestException;
    VakitaDTO updateVakita(VakitaDTO vakita) throws BadRequestException;
    void addContributor(Long id, UserDTO user) throws ResourceNotFoundException, BadRequestException;
    void cancelVakita(Long id) throws ResourceNotFoundException, BadRequestException;

    //delete
    void deleteVakita(Long id) throws ResourceNotFoundException, BadRequestException;









}
