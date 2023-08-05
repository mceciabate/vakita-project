package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.entity.Vakita;
import com.grupo3.msvakitas.repository.IVakitaRepository;
import com.grupo3.msvakitas.service.IVakitaService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public VakitaDTO getVakitaById(Long id){
        Optional<Vakita> vakita = vakitaRepository.findById(id);
        VakitaDTO vakitaDTO = null;
        if(vakita.isPresent()){
            vakitaDTO = mapper.map(vakita, VakitaDTO.class);
        }
        log.info("Get vakita id:" + vakitaDTO.getId());
        return  vakitaDTO;
    }

    //Método para filtrar las vakitas por usuario que la creó
    @Override
    public List<VakitaDTO> getVakitaByOwner(Long id){
        List<VakitaDTO> listaVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitasByOwner = new ArrayList<>();
        for (VakitaDTO vakita : listaVakitas) {
            if(vakita.getIdCreatorUser().equals(id)){
                vakitasByOwner.add(vakita);
            }

        }
        log.info("Get vakitasByOwner. Size: " + vakitasByOwner.size());
        return vakitasByOwner;
    }

    //Método para crear una nueva vakita
    @Override
    public VakitaDTO createVakita(VakitaDTO vakita){
        //TODO validaciones aqui?
        Vakita vakitaNew = mapper.map(vakita, Vakita.class);
        vakitaRepository.save(vakitaNew);
        log.info("Saving new vakita from user:" + vakita.getIdCreatorUser());
        return mapper.map(vakitaNew, VakitaDTO.class);

    }

    //Método para modificar el saldo de una vaquita
    @Override
    public void modifyAmount(Double amount, Long id){
        VakitaDTO vakitaModify = this.getVakitaById(id);
        Double amountDiference = vakitaModify.getTotalAmount() - vakitaModify.getCumulativeAmount();
        if(vakitaModify.getIsActive() == true && amount <= amountDiference ){
            Double deposit = vakitaModify.getCumulativeAmount() + amount;
            vakitaModify.setCumulativeAmount(deposit);
            this.updateVakita(vakitaModify);
        }
        else{
            log.info("Error from amount method");
        }
        log.info("Success, amount update: "+ vakitaModify.getCumulativeAmount());

    }


    //Este método filtra las vakitas activas de un user
    @Override
    //TODO MODIFICAR ESTE METODO
    public List<VakitaDTO> getVakitasActivesByOwner(Long id){
        List<VakitaDTO> lista = this.getVakitaByOwner(id);
        List<VakitaDTO> listaActivas = new ArrayList<>();
        for (VakitaDTO vakita : lista) {
            if (vakita.getIsActive()==true){
                listaActivas.add(vakita);
            }
        }
        //TODO completar este logger
        log.info("Get all vakitas actives from user, size: " + listaActivas.size());
        return  listaActivas;
    }

    //Este método filtra las vakitas que coinciden con un email de un user
    //Es para saber en que vakitas participo aunque yo no sea el owner, es decir
    //aunque yo no sea quien las creó.

    @Override
    public List<VakitaDTO> getVakitasByContributors(String email){
        List<VakitaDTO> allVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitaListByContributor = new ArrayList<>();
        //TODO: FIX FOR DENTRO DEL FOR
        for (VakitaDTO vakita : allVakitas) {
            for (UserDTO contributor : vakita.getContributors()) {
                if(contributor.getMail() == email){
                    vakitaListByContributor.add(vakita);
                }

            }
        }
        log.info("Get vakitas list from contributor: "+ email);
        return vakitaListByContributor;
    }

    //Este método es para actualizar una vakita existente
    @Override
    public VakitaDTO updateVakita(VakitaDTO vakita){
        if(vakitaRepository.existsById(vakita.getId())){
            Vakita vakitaToSave = mapper.map(vakita, Vakita.class);
            vakitaRepository.save(vakitaToSave);
        }
        log.info("Update vakita id: " + vakita.getId());
        return vakita;
    }

    //Este método es para agregarme como contribuyente a una vakita
    @Override
    public void addContributor(Long vakitaId, UserDTO user){
        VakitaDTO vakita = this.getVakitaById(vakitaId);
        List<UserDTO> listContributors =  vakita.getContributors();
        listContributors.add(user);
        this.updateVakita(vakita);
        log.info("Success updating vakita: " + vakitaId);
    }

    //Método para eliminar una vakita
    @Override
    public void deleteVakita(Long id){
        VakitaDTO vakitaToDrop = this.getVakitaById(id);
        Vakita vakitaEntityToDrop = mapper.map(vakitaToDrop, Vakita.class);
        vakitaRepository.delete(vakitaEntityToDrop);
        log.info("Success, vakita deleted: " + id);

    }

    //Este método es para dejar una vakita inactiva, es decir
    //para cuando se quiera cancelar antes de la fecha de término
    //o antes de cumplir el objetivo
    @Override
    public void cancelVakita(Long id){
        VakitaDTO vakitaToCancel = this.getVakitaById(id);
        if (vakitaToCancel.getIsActive() == true){
            vakitaToCancel.setIsActive(false);
        }
        log.info("Success, cancel vakita id: " + id);
        this.updateVakita(vakitaToCancel);
    }

}



