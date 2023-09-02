package grupo3.mspayment.controller;


import grupo3.mspayment.handler.ResourceNotFoundException;
import grupo3.mspayment.model.collection.CreditCard;
import grupo3.mspayment.model.dto.CreditCardDTO;
import grupo3.mspayment.service.impl.CreditCardService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Slf4j
@RequestMapping("api/v1/payment")
public class PaymentController {

    @Autowired
    private CreditCardService ccService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity createCC(@Valid @RequestBody CreditCardDTO cc){
        cc.setCreditCardId(ccService.getSequenceNumber(CreditCard.SEQUENCE_NAME));
        ccService.registerCreditCard(cc);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<CreditCardDTO>> getAllCC(){
        return ResponseEntity.ok(ccService.getAllCards());
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<CreditCardDTO> getCCById(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(ccService.getCreditCardById(id));
    }

    @GetMapping("/personal/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<CreditCardDTO>> getCCByUser(@PathVariable Integer userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(ccService.getCardsByUser(userId));
    }

    @PatchMapping("/alias/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity modifyAliasCC(@PathVariable Integer id, @RequestParam String alias) throws ResourceNotFoundException {
        ccService.updateAliasCreditCard(id, alias);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity deleteCC(@PathVariable Integer id) throws ResourceNotFoundException {
        ccService.deleteCreditCard(id);
        return ResponseEntity.ok().build();
    }






}
