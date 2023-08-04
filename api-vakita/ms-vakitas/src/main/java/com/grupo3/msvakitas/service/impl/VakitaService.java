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




    private final ModelMapper mapper;

    @Autowired
    private final IVakitaRepository vakitaRepository;


    public VakitaService(IVakitaRepository vakitaRepository, ModelMapper mapper) {
        this.vakitaRepository = vakitaRepository;
        this.mapper = new ModelMapper();
    }


    @Override
    public List<VakitaDTO> getAllVakitas(){
        List<VakitaDTO> listaVakitas = new ArrayList<>();
        List<Vakita> vakitas = vakitaRepository.findAll();
        vakitas.forEach(vakita -> listaVakitas.add(mapper.map(vakita, VakitaDTO.class)));
        log.info("Get all vakitas list");
        return  listaVakitas;
    }
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

    @Override
    public List<VakitaDTO> getVakitaByOwner(Long id){
        List<VakitaDTO> listaVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitasByUser = new ArrayList<>();
        for (VakitaDTO vakita : listaVakitas) {
            if(vakita.getIdCreatorUser().equals(id)){
                vakitasByUser.add(vakita);
            }

        }
        log.info("Get vakitasByOwner. Size: " + vakitasByUser.size());
        return vakitasByUser;
    }

    @Override
    public VakitaDTO createVakita(VakitaDTO vakita){
        //TODO validaciones aqui?
        Vakita vakitaNew = mapper.map(vakita, Vakita.class);
        vakitaRepository.save(vakitaNew);
        log.info("Saving new vakita from user:" + vakita.getIdCreatorUser());
        return mapper.map(vakitaNew, VakitaDTO.class);

    }

    @Override
    public String modifyAmount(Double amount, Long id){
        String response;
        VakitaDTO vakitaModify = this.getVakitaById(id);
        Double amountDiference = vakitaModify.getTotalAmount() - vakitaModify.getCumulativeAmount();
        if(vakitaModify.getIsActive() == true && amount <= amountDiference ){
            Double deposit = vakitaModify.getCumulativeAmount() + amount;
            vakitaModify.setCumulativeAmount(deposit);
            response = "Has aumentado el saldo de tu vakita exiosamente";
        }
        else{
            response = "No se puede modificar el saldo";
            log.info("Error from amount method");
        }
        log.info("Success, amount update");
        return response;

    }

    @Override
    //TODO MODIFICAR ESTE METODO
    public List<VakitaDTO> getVakitasActives(){
        List<VakitaDTO> lista = this.getAllVakitas();
        List<VakitaDTO> listaActivas = new ArrayList<>();
        for (VakitaDTO vakita : lista) {
            if (vakita.getIsActive()==true){
                listaActivas.add(vakita);
            }
        }
        //TODO completar este logger
        log.info("Get all vakitas actives from user: ");
        return  listaActivas;
    }

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

    @Override
    public VakitaDTO updateVakita(VakitaDTO vakita){
        if(vakitaRepository.existsById(vakita.getId())){
            Vakita vakitaToSave = mapper.map(vakita, Vakita.class);
            vakitaRepository.save(vakitaToSave);
        }
        log.info("Update vakita id: " + vakita.getId());
        return vakita;
    }

    @Override
    public void addContributor(Long id, UserDTO user){
        VakitaDTO vakita = this.getVakitaById(id);
        List<UserDTO> contributors = vakita.getContributors();
        contributors.add(user);
        this.updateVakita(vakita);
        log.info("Success updating vakita: " + id);
    }

    public void deleteVakita(Long id){
        VakitaDTO vakitaToDrop = this.getVakitaById(id);
        Vakita vakitaEntityToDrop = mapper.map(vakitaToDrop, Vakita.class);
        vakitaRepository.delete(vakitaEntityToDrop);
        log.info("Success, vakita deleted: " + id);

    }

    @Override
    public void cancelVakita(Long id){
        VakitaDTO vakitaToCancel = this.getVakitaById(id);
        if (vakitaToCancel.getIsActive() == true){
            vakitaToCancel.setIsActive(false);
        }
        log.info("Success, cencel vakita id: " + id);
        this.updateVakita(vakitaToCancel);
    }

}



