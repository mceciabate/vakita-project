package com.grupo3.msvakitas.service;

import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.entity.Vakita;
import com.grupo3.msvakitas.repository.IVakitaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VakitaService {


    //TODO LOGUEO
    //TODO: CREAR INTERFAZ
    //TODO AUTOWIRED NO ESTARÍA FUNCIONANDO
    @Autowired
    private final ModelMapper mapper;
    @Autowired
    private final IVakitaRepository vakitaRepository;

    public VakitaService(IVakitaRepository vakitaRepository, ModelMapper mapper) {
        this.vakitaRepository = vakitaRepository;
        this.mapper = mapper;
    }


    public List<VakitaDTO> getAllVakitas(){
        List<VakitaDTO> listaVakitas = new ArrayList<>();
        List<Vakita> vakitas = vakitaRepository.findAll();
        vakitas.forEach(vakita -> listaVakitas.add(mapper.map(vakita, VakitaDTO.class)));
        return  listaVakitas;
    }

    public VakitaDTO getVakitaById(Long id){
        Optional<Vakita> vakita = vakitaRepository.findById(id);
        VakitaDTO vakitaDTO = null;
        if(vakita.isPresent()){
            vakitaDTO = mapper.map(vakita, VakitaDTO.class);
        }
        return  vakitaDTO;
    }

    public List<VakitaDTO> getVakitaByOwner(Long id){
        List<VakitaDTO> listaVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitasByUser = new ArrayList<>();
        for (VakitaDTO vakita : listaVakitas) {
            if(vakita.getIdCreatorUser().equals(id)){
                vakitasByUser.add(vakita);
            }

        }
        return vakitasByUser;
    }

    public VakitaDTO createVakita(VakitaDTO vakita){
        //TODO validaciones aqui?
        Vakita vakitaNew = mapper.map(vakita, Vakita.class);
        vakitaRepository.save(vakitaNew);
        return mapper.map(vakitaNew, VakitaDTO.class);

    }

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
        }
        return response;
    }

    public List<VakitaDTO> getVakitasActives(){
        List<VakitaDTO> lista = this.getAllVakitas();
        List<VakitaDTO> listaActivas = new ArrayList<>();
        for (VakitaDTO vakita : lista) {
            if (vakita.getIsActive()==true){
                listaActivas.add(vakita);
            }
        }
        return  listaActivas;
    }

    public List<VakitaDTO> getVakitasbyContributors(String email){
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
        return vakitaListByContributor;
    }

    //TODO: DROP/UPDATE/ADD CONTRIBUTOR/?



}



