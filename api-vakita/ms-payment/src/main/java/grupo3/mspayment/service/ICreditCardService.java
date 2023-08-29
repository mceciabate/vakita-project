package grupo3.mspayment.service;

import grupo3.mspayment.handler.ResourceNotFoundException;
import grupo3.mspayment.model.dto.CreditCardDTO;

import java.util.List;

public interface ICreditCardService {
    List<CreditCardDTO> getAllCards();

    List<CreditCardDTO> getCardsByUser(Long userId) throws ResourceNotFoundException;

    void registerCreditCard(CreditCardDTO creditCard);

    void deleteCreditCard(Long creditCardId) throws ResourceNotFoundException;
}
