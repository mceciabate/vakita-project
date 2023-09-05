package com.grupo3.msvakitas.service.impl;

import com.grupo3.msvakitas.handler.ResourceNotFoundException;
import com.grupo3.msvakitas.model.dto.TransactionDTO;
import com.grupo3.msvakitas.model.entity.Transaction;
import com.grupo3.msvakitas.repository.ITransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class TransactionService{

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ITransactionRepository repository;

    public List<TransactionDTO> getTransactionsByVakitaId(Long vakitaId) throws ResourceNotFoundException {
        List<Transaction> transactions = repository.findAll();
        List<TransactionDTO> transactionDTOS = new ArrayList<>();
        for (Transaction transaction : transactions) {
            if(transaction.getVakita().getId().equals(vakitaId)){
                transactionDTOS.add(mapper.map(transaction, TransactionDTO.class));
            }
            else throw new ResourceNotFoundException("El usuario no tiene transacciones para mostrar en esta vakita");
        }
        return transactionDTOS;

    }

    public List<TransactionDTO> getTransactionsByUserIdVakitaId(Long userId, Long vakitaId) throws ResourceNotFoundException {
        List<TransactionDTO> tByUser = new ArrayList<>();
        List<TransactionDTO> transactions = this.getTransactionsByVakitaId(vakitaId);
        for (TransactionDTO transaction : transactions) {
            if(transaction.getUserId() == userId){
                tByUser.add(transaction);
            }

        }
        return tByUser;
    }

    public List<TransactionDTO> getTransccionsByUser(Long userid) throws ResourceNotFoundException {
        List<Transaction> transactions = repository.findAll();
        List<TransactionDTO> transactionByUser = new ArrayList<>();
        for (Transaction transaction : transactions) {
            if(transaction.getUserId().equals(userid)){
                transactionByUser.add(mapper.map(transaction, TransactionDTO.class));
            }
            else throw new ResourceNotFoundException("El usuario no tiene transacciones para mostrar");
        }
        return transactionByUser;
    }

    public List<TransactionDTO> getTransactionsByVakitaByDate(Long vakitaId, LocalDate inicialDate, LocalDate finalDate) throws ResourceNotFoundException {
        List<TransactionDTO> tByDateFilter = new ArrayList<>();
        List<TransactionDTO> transactionDTOS = this.getTransactionsByVakitaId(vakitaId);
        for (TransactionDTO transactionDTO : transactionDTOS) {
            if (transactionDTO.getDate().isBefore(finalDate) && transactionDTO.getDate().isAfter(inicialDate)){
                tByDateFilter.add(transactionDTO);
            }
            else throw new ResourceNotFoundException("No hay transaccioens disponibles para las fechas solicitadas");
        }
        return tByDateFilter;
    }








}
