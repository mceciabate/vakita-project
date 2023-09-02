package grupo3.mspayment.service;

import grupo3.mspayment.handler.ResourceNotFoundException;
import grupo3.mspayment.model.dto.CreditCardDTO;

import java.util.List;

public interface ICreditCardService {
    List<CreditCardDTO> getAllCards();

    CreditCardDTO getCreditCardById(Integer creditCardId) throws ResourceNotFoundException;

    List<CreditCardDTO> getCardsByUser(Integer userId) throws ResourceNotFoundException;

    void registerCreditCard(CreditCardDTO creditCard);

    void deleteCreditCard(Integer creditCardId) throws ResourceNotFoundException;

    boolean updateAliasCreditCard(Integer creditCardId, String alias) throws ResourceNotFoundException;
}
