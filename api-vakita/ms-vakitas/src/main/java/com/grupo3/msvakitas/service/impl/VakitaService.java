package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.entity.Vakita;
import com.grupo3.msvakitas.repository.IVakitaRepository;
import com.grupo3.msvakitas.service.IVakitaService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class VakitaService implements IVakitaService {



    @Autowired
    private  ModelMapper mapper;

    @Autowired
    private IVakitaRepository vakitaRepository;

    //Método para traer todas las vakitas
    //TODO: CONSULTAR SI QUIEREN UN ERROR O UNA LISTA VACÍA ESTÁ BIEN
    @Override
    public List<VakitaDTO> getAllVakitas(){
        List<VakitaDTO> listaVakitas = new ArrayList<>();
        List<Vakita> vakitas = vakitaRepository.findAll();
        vakitas.forEach(vakita -> listaVakitas.add(mapper.map(vakita, VakitaDTO.class)));
        log.info("Get all vakitas list");
        return  listaVakitas;
    }

    //Método para traer vakitas por id
    @Override
    public VakitaDTO getVakitaById(Long id) throws ResourceNotFoundException {
        Optional<Vakita> vakita = vakitaRepository.findById(id);
        VakitaDTO vakitaDTO;
        if(!vakita.isPresent()){
           throw new ResourceNotFoundException("No se encuentra la vakita con id "+id);
        }
        else{
            vakitaDTO = mapper.map(vakita, VakitaDTO.class);
        }
        log.info("Get vakita id:" + vakitaDTO.getId());
        return vakitaDTO;

    }

    //Método para filtrar las vakitas por usuario que la creó
    @Override
    public List<VakitaDTO> getVakitasByOwner(Long id) throws ResourceNotFoundException{
        List<VakitaDTO> listaVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitasByOwner = new ArrayList<>();
        for (VakitaDTO vakita : listaVakitas) {
            if(vakita.getIdCreatorUser().equals(id)){
                vakitasByOwner.add(vakita);
            }
        }
        if (vakitasByOwner.size() == 0) {
            throw new ResourceNotFoundException("El usuario con id: " + id +" no tiene vakitas para mostrar");
        }
        else{
            log.info("Get vakitasByOwner, Size: " + vakitasByOwner.size());
            return vakitasByOwner;
        }

    }

    //Método para crear una nueva vakita
    @Override
    public VakitaDTO createVakita(VakitaDTO vakita) throws BadRequestException {
        if(vakita.getExpirationDate().equals(LocalDate.now()) || vakita.getName() == null || vakita.getIdCreatorUser() == null){
            throw new BadRequestException("No se puede crear la vakita, corrobore los datos");
        } else {
            Vakita vakitaNew = mapper.map(vakita, Vakita.class);
            vakitaRepository.save(vakitaNew);
            log.info("Saving new vakita from user:" + vakita.getIdCreatorUser());
            return mapper.map(vakitaNew, VakitaDTO.class);
        }
    }

    //Método para modificar el saldo de una vaquita
    @Override
    public void modifyAmount(Double amount, Long id) throws ResourceNotFoundException, BadRequestException{
        VakitaDTO vakitaModify = this.getVakitaById(id);
        Double amountDiference = vakitaModify.getTotalAmount() - vakitaModify.getCumulativeAmount();
        if(vakitaModify.getIsActive() && amount <= amountDiference ){
            Double deposit = vakitaModify.getCumulativeAmount() + amount;
            vakitaModify.setCumulativeAmount(deposit);
            log.info("Success, amount update: "+ vakitaModify.getCumulativeAmount());
            this.updateVakita(vakitaModify);
        }
        else if(!vakitaModify.getIsActive()){
            throw new BadRequestException("Para depositar dinero la vakita debe estar activa");
        }
        else if(amount > amountDiference){
            throw new BadRequestException("El monto a depositar no puede superar el total restante");
        }
    }


    //Este método filtra las vakitas activas de un user
    @Override
    public List<VakitaDTO> getVakitasActivesByOwner(Long id) throws ResourceNotFoundException{
        List<VakitaDTO> lista = this.getVakitasByOwner(id);
        List<VakitaDTO> listaActivas = new ArrayList<>();
        for (VakitaDTO vakita : lista) {
            if (vakita.getIsActive()){
                listaActivas.add(vakita);
            }
        }
        if(listaActivas.size()==0){
            throw new ResourceNotFoundException("El usuario no posee vaitas activas");
        }
        log.info("Get all vakitas actives from user "+id+", size: " + listaActivas.size());
        return  listaActivas;
    }

    //Este método filtra las vakitas que coinciden con un email de un user
    //Es para saber en que vakitas participo aunque yo no sea el owner, es decir
    //aunque yo no sea quien las creó.

    @Override
    public List<VakitaDTO> getVakitasByContributors(String email) throws ResourceNotFoundException {
        List<VakitaDTO> allVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitaListByContributor = new ArrayList<>();
        //TODO: FIX FOR DENTRO DEL FOR
        for (VakitaDTO vakita : allVakitas) {
            for (UserDTO contributor : vakita.getContributors()) {
                if(contributor.getMail().equals(email)){
                    vakitaListByContributor.add(vakita);
                }
            }
        }
        if(vakitaListByContributor.size() == 0){
            throw new ResourceNotFoundException("El usuario no tiene vakitas para mostrar");
        }
        log.info("Get vakitas list from contributor: "+ email);
        return vakitaListByContributor;
    }

    //Este método es para actualizar una vakita existente
    @Override
    public VakitaDTO updateVakita(VakitaDTO vakita) throws BadRequestException {
        if (vakita.getExpirationDate().equals(LocalDate.now()) || vakita.getName() == null || vakita.getIdCreatorUser() == null){
            throw new BadRequestException("Alguno de los datos es incorrecto, no se puede actualizar la vakita");
        }
        else if(vakitaRepository.existsById(vakita.getId())){
            Vakita vakitaToSave = mapper.map(vakita, Vakita.class);
            vakitaRepository.save(vakitaToSave);
        }
        log.info("Update vakita id: " + vakita.getId());
        return vakita;
    }

    //Este método es para agregarme como contribuyente a una vakita
    @Override
    public void addContributor(Long vakitaId, UserDTO user) throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakita = this.getVakitaById(vakitaId);
        List<UserDTO> listContributors =  vakita.getContributors();
        listContributors.add(user);
        this.updateVakita(vakita);
        log.info("Success updating vakita: " + vakitaId);
    }

    //Método para eliminar una vakita
    @Override
    public void deleteVakita(Long id) throws ResourceNotFoundException{
        VakitaDTO vakitaToDrop = this.getVakitaById(id);
        Vakita vakitaEntityToDrop = mapper.map(vakitaToDrop, Vakita.class);
        vakitaRepository.delete(vakitaEntityToDrop);
        log.info("Success, vakita deleted: " + id);

    }

    //Este método es para dejar una vakita inactiva, es decir
    //para cuando se quiera cancelar antes de la fecha de término
    //o antes de cumplir el objetivo
    @Override
    public void cancelVakita(Long id) throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaToCancel = this.getVakitaById(id);
        if (vakitaToCancel.getIsActive()){
            vakitaToCancel.setIsActive(false);
        }
        log.info("Success, cancel vakita id: " + id);
        this.updateVakita(vakitaToCancel);
    }

}



