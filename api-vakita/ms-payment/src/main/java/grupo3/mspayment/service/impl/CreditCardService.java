package grupo3.mspayment.service.impl;

import grupo3.mspayment.handler.ResourceNotFoundException;
import grupo3.mspayment.model.collection.CreditCard;
import grupo3.mspayment.model.dto.CreditCardDTO;
import grupo3.mspayment.repository.ICreditCardMongoRepository;
import grupo3.mspayment.service.ICreditCardService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class CreditCardService implements ICreditCardService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private ICreditCardMongoRepository repository;

    @Override
    public List<CreditCardDTO> getAllCards(){
        List<CreditCardDTO> cardsList = new ArrayList<>();
        List<CreditCard> cards = repository.findAll();
        cards.forEach(card -> cardsList.add(mapper.map(card, CreditCardDTO.class)));
        log.info("Get all cards. Size: " + cards.size());
        return cardsList;
    }

    @Override
    public CreditCardDTO getCreditCardById(Long creditCardId) throws ResourceNotFoundException {
        CreditCardDTO creditCard;
        Optional<CreditCard> cC = repository.findById(creditCardId);
        if (cC.isPresent()){
            creditCard = mapper.map(cC, CreditCardDTO.class);
            return creditCard;
        }
        else {
            throw new ResourceNotFoundException("No se encuentra la tarjeta con id: "+ creditCardId);
        }
    }


    @Override
    public List<CreditCardDTO> getCardsByUser(Long userId) throws ResourceNotFoundException {
        List<CreditCardDTO> cardList = this.getAllCards();
        List<CreditCardDTO> cardsByUser = new ArrayList<>();
        for (CreditCardDTO creditCardDTO : cardList) {
            if(creditCardDTO.getUserId().equals(userId)){
                cardsByUser.add(creditCardDTO);
            }
        }
        if(cardsByUser.size() > 0){
            return cardsByUser;
        }
        else {
            throw new ResourceNotFoundException("El usuario no tiene tarjetas para mostrar");
        }
    }

    @Override
    public void registerCreditCard(CreditCardDTO creditCard){
        String creditCardNumberEncoder = encoder.encode(creditCard.getCardNumber());
        String encoderCvv = encoder.encode(creditCard.getCvv());
        creditCard.setCardNumber(creditCardNumberEncoder);
        creditCard.setCvv(encoderCvv);
        CreditCard newCreditCard = mapper.map(creditCard, CreditCard.class);
        repository.save(newCreditCard);
        log.info("Saving CreditCard");
    }

    @Override
    public void deleteCreditCard(Long creditCardId) throws ResourceNotFoundException {
        if (repository.existsById(creditCardId)) {
            repository.deleteById(creditCardId);
        } else {
            throw new ResourceNotFoundException("No se encuentra la tarjeta con id: " + creditCardId);
        }
    }

    @Override
    public boolean updateAliasCreditCard(Long creditCardId, String alias) throws ResourceNotFoundException {
        CreditCardDTO creditCardDTO = this.getCreditCardById(creditCardId);
        if(creditCardDTO != null){
            creditCardDTO.setUserId(creditCardDTO.getUserId());
            creditCardDTO.setAlias(alias);
            creditCardDTO.setCardNumber(creditCardDTO.getCardNumber());
            creditCardDTO.setExpirationDate(creditCardDTO.getExpirationDate());
            creditCardDTO.setCvv(creditCardDTO.getCvv());
            repository.save(mapper.map(creditCardDTO, CreditCard.class));
            return true;
        }
        else {
            throw new ResourceNotFoundException("No se encuentra la tarjeta con id : " + creditCardId);
        }
    }
}
