package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.event.NewVakitaEventProducer;
import com.grupo3.msvakitas.handler.BadRequestException;
import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.TransactionDTO;
import com.grupo3.msvakitas.model.dto.UserForTransactionRabbitDTO;
import com.grupo3.msvakitas.model.dto.UserDTO;
import com.grupo3.msvakitas.model.dto.VakitaDTO;
import com.grupo3.msvakitas.model.entity.Transaction;
import com.grupo3.msvakitas.model.entity.Vakita;
import com.grupo3.msvakitas.repository.ITransactionRepository;
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
    private NewVakitaEventProducer event;

    @Autowired
    private IVakitaRepository vakitaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ITransactionRepository tRepository;



    //Método para traer todas las vakitas
    //TODO: CONSULTAR SI QUIEREN UN ERROR O UNA LISTA VACÍA ESTÁ BIEN
    @Override
    public List<VakitaDTO> getAllVakitas(){
        List<VakitaDTO> listaVakitas = new ArrayList<>();
        List<Vakita> vakitas = vakitaRepository.findAll();
        vakitas.forEach(vakita -> listaVakitas.add(mapper.map(vakita, VakitaDTO.class)));
        log.info("Get all vakitas list. Size: " + listaVakitas.size());
        return  listaVakitas;
    }

    //Método para traer vakitas por id
    @Override
    public VakitaDTO getVakitaById(Long id) throws ResourceNotFoundException {
        Optional<Vakita> vakita = vakitaRepository.findById(id);
        VakitaDTO vakitaDTO;
        if(!vakita.isPresent()){
           throw new ResourceNotFoundException("No se encuentra la vakita con id: "+id);
        }
        else{
            vakitaDTO = mapper.map(vakita, VakitaDTO.class);
        }
        log.info("Get vakita id:" + vakitaDTO.getId());
        return vakitaDTO;

    }

    //Método para filtrar las vakitas por usuario que la creó
    @Override
    public List<VakitaDTO> getVakitasByOwner(Long userId) throws ResourceNotFoundException{
        List<VakitaDTO> listaVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitasByOwner = new ArrayList<>();
        for (VakitaDTO vakita : listaVakitas) {
            if(vakita.getIdCreatorUser().equals(userId)){
                vakitasByOwner.add(vakita);
            }
        }
        if (vakitasByOwner.size() == 0) {
            throw new ResourceNotFoundException("El usuario con id: " + userId +" no tiene vakitas para mostrar");
        }
        else{
            log.info("Get vakitasByOwner, Size: " + vakitasByOwner.size());
            return vakitasByOwner;
        }

    }

    //Método para crear una nueva vakita
    @Override
    public VakitaDTO createVakita(VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
        if(vakita.getExpirationDate().equals(LocalDate.now()) || vakita.getName() == null || vakita.getIdCreatorUser() == null){
            throw new BadRequestException("No se puede crear la vakita, corrobore los datos: fecha_expiración(debe ser distinta al día actual),name(no pued ser nulo), idCreatorUser(no puede ser nulo) ");
        } else {
            UserDTO userToAdd = usuarioService.getUserById(vakita.getIdCreatorUser());
            vakita.getContributors().add(userToAdd);
            Vakita vakitaNew = mapper.map(vakita, Vakita.class);
            vakitaRepository.save(vakitaNew);
            log.info("Saving new vakita from user:" + vakita.getIdCreatorUser());
            return mapper.map(vakitaNew, VakitaDTO.class);
        }
    }

    //Método para modificar el saldo de una vaquita
    //TODO: FALTA LA VALIDACION DE USUARIO
    @Override
    public void modifyAmount(Long userID, Long vakitaId, Double amount) throws ResourceNotFoundException, BadRequestException{
        VakitaDTO vakitaModify = this.getVakitaById(vakitaId);
        Double amountDiference = vakitaModify.getTotalAmount() - vakitaModify.getCumulativeAmount();
        if(vakitaModify.getIsActive() && amount <= amountDiference ){
            Double deposit = vakitaModify.getCumulativeAmount() + amount;
            vakitaModify.setCumulativeAmount(deposit);
            log.info("Success, amount update: "+ vakitaModify.getCumulativeAmount());
            this.updateVakita(vakitaId, vakitaModify);
            TransactionDTO transactionDTO = new TransactionDTO(LocalDate.now(), userID, vakitaId, amount);
            log.info("creando nueva transacción en la vakita con id : " + vakitaId);
            tRepository.save(mapper.map(transactionDTO, Transaction.class));
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
    public List<VakitaDTO> getVakitasActivesByContributor(Long id) throws ResourceNotFoundException{
        List<VakitaDTO> lista = this.getVakitasByContributors(id);
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

    //Este método filtra las vakitas que coinciden con un id de un user
    //Es para saber en qué vakitas participo aunque yo no sea el owner, es decir
    //aunque yo no sea quien las creó.

    @Override
    public List<VakitaDTO> getVakitasByContributors(Long userId) throws ResourceNotFoundException {
        List<VakitaDTO> allVakitas = this.getAllVakitas();
        List<VakitaDTO> vakitaListByContributor = new ArrayList<>();
        //TODO: FIX FOR DENTRO DEL FOR
        for (VakitaDTO vakita : allVakitas) {
            for (UserDTO contributor : vakita.getContributors()) {
                if(contributor.getId().equals(userId)){
                    vakitaListByContributor.add(vakita);
                }
            }
        }
        if(vakitaListByContributor.size() == 0){
            throw new ResourceNotFoundException("El usuario no tiene vakitas para mostrar");
        }
        log.info("Get vakitas list from contributor: "+ userId);
        return vakitaListByContributor;
    }

    //Este método es para actualizar una vakita existente
    @Override
    public VakitaDTO updateVakita(Long id, VakitaDTO vakita) throws BadRequestException, ResourceNotFoundException {
         VakitaDTO vakitaToModify = this.getVakitaById(id);
        if (vakita.getExpirationDate().equals(LocalDate.now()) || vakita.getName() == null || vakita.getIdCreatorUser() == null){
            throw new BadRequestException("Alguno de los datos es incorrecto, no se puede actualizar la vakita");
        }
        vakitaToModify.setName(vakita.getName());
        vakitaToModify.setIdCreatorUser(vakita.getIdCreatorUser());
        vakitaToModify.setDescription(vakita.getDescription());
        vakitaToModify.setImgURL(vakita.getImgURL());
        vakitaToModify.setTotalAmount(vakita.getTotalAmount());
        vakitaToModify.setCumulativeAmount(vakita.getCumulativeAmount());
        vakitaToModify.setCreationDate(vakita.getCreationDate());
        vakitaToModify.setExpirationDate(vakita.getExpirationDate());
        vakitaToModify.setIsActive(vakita.getIsActive());
        vakitaToModify.setType(vakita.getType());
        vakitaToModify.setContributors(vakita.getContributors());
        vakitaToModify.setTransactions(vakita.getTransactions());

        if(vakitaRepository.existsById(vakitaToModify.getId())){
            Vakita vakitaToSave = mapper.map(vakitaToModify, Vakita.class);
            vakitaRepository.save(vakitaToSave);
        }
        log.info("Update vakita id: " + id);
        return vakita;
    }
    //Este método es para modificar parcialmete una vakita existente
    //LOS CAMPOS QUE SE PERMITEN MODIFICAR SON: Descripcion, imagen, fecha de expiracion

    @Override
    public VakitaDTO partialUpdate(Long id, String key, String value) throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaToModify = this.getVakitaById(id);
        if (key.equalsIgnoreCase("descripcion")){
            vakitaToModify.setDescription(value);
        }
        if (key.equalsIgnoreCase("imagen")){
            vakitaToModify.setImgURL(value);
        }
        if(key.equalsIgnoreCase("fecha_expiracion")){
            vakitaToModify.setExpirationDate(LocalDate.parse(value));
        }
        this.updateVakita(id, vakitaToModify);
        return vakitaToModify;
    }

    //Este método es para agregarme como contribuyente a una vakita
    //TODO: VALIDAR SI EL USUARIO YA ES PARTE DE LA LISTA
    @Override
    public void addContributor(Long vakitaId, Long userId) throws ResourceNotFoundException, BadRequestException {
        UserDTO newContributor = usuarioService.getUserById(userId);
        VakitaDTO vakita = this.getVakitaById(vakitaId);
        vakita.getContributors().add(newContributor);
        this.updateVakita(vakitaId, vakita);
        log.info("Success updating contributor in  vakita: " + vakitaId);
    }

    //Método para eliminar una vakita
    @Override
    public void deleteVakita(Long id) throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaToDrop = this.getVakitaById(id);
        if (vakitaToDrop.getIsActive() == true ){
            throw new BadRequestException("Para eliminar un vakita debe estar inactiva");
        }
        else if(vakitaToDrop.getCumulativeAmount() > 0.0){
            throw new BadRequestException("La vakita debe estar vacía");
        }
        else {
            Vakita vakitaEntityToDrop = mapper.map(vakitaToDrop, Vakita.class);
            vakitaRepository.delete(vakitaEntityToDrop);
            log.info("Success, vakita deleted: " + id);
        }
    }

    //Este método es para dejar una vakita inactiva, es decir
    //para cuando se quiera cancelar antes de la fecha de término
    //o antes de llegar al dinero que se puso como  objetivo.
    //A las vakitas inctivas no se les puede agregar dinero, sería el paso
    //previo para devolver al usuario el monto acumulado.
    @Override
    public void inactiveVakita(Long id) throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaToCancel = this.getVakitaById(id);
        if (vakitaToCancel.getIsActive()){
            vakitaToCancel.setIsActive(false);
        }
        log.info("Success, cancel vakita id: " + id);
        this.updateVakita(id, vakitaToCancel);
    }

    //Este método devuelve el dinero total acumulado de una vakita al usuario que la creo
    @Override
    public void drainVakita(Long id) throws ResourceNotFoundException, BadRequestException {
        VakitaDTO vakitaToDrain = this.getVakitaById(id);
        Long userCreator = vakitaToDrain.getIdCreatorUser();
        Double cumulativeAmountFromVakitaToDrain = vakitaToDrain.getCumulativeAmount();
        UserForTransactionRabbitDTO user = new UserForTransactionRabbitDTO();
        user.setId(userCreator);
        user.setAmount(cumulativeAmountFromVakitaToDrain);
        if (!vakitaToDrain.getIsActive()){
            vakitaToDrain.setCumulativeAmount(0.0);
            this.updateVakita(id, vakitaToDrain);
            event.executeAmount(user);
            log.info("Se ha vaciado la vakita id: " + id);
        }
        else throw new BadRequestException("No se puede vaciar una vakita activa");

    }


}



