package com.grupo3.msvakitas.service;

import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;

import java.util.List;

public interface IVakitaService {

    //read
    List<VakitaDTO> getAllVakitas();
    VakitaDTO getVakitaById(Long id);
    List<VakitaDTO> getVakitaByOwner(Long id);
    List<VakitaDTO> getVakitasActives();
    List<VakitaDTO> getVakitasByContributors(String email);

    //create
    VakitaDTO createVakita(VakitaDTO vakita);

    //update
    String modifyAmount(Double amount, Long id);
    VakitaDTO updateVakita(VakitaDTO vakita);
    void addContributor(Long id, UserDTO user);
    void cancelVakita(Long id);

    //delete
    void deleteVakita(Long id);









}
