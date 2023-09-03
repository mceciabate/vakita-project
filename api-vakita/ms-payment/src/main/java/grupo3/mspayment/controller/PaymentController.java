package grupo3.mspayment.controller;


import grupo3.mspayment.handler.ResourceNotFoundException;
import grupo3.mspayment.model.collection.CreditCard;
import grupo3.mspayment.model.dto.CreditCardDTO;
import grupo3.mspayment.service.impl.CreditCardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Payment")
public class PaymentController {

    @Autowired
    private CreditCardService ccService;

    @Operation(summary = "Registrar una trajeta de crédito")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity createCC(@Valid @RequestBody CreditCardDTO cc){
        cc.setCreditCardId(ccService.getSequenceNumber(CreditCard.SEQUENCE_NAME));
        ccService.registerCreditCard(cc);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Listar todas las tarjetas de crédito")
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<CreditCardDTO>> getAllCC(){
        return ResponseEntity.ok(ccService.getAllCards());
    }

    @Operation(summary = "Buscar una tarjeta de crédito por id")
    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<CreditCardDTO> getCCById(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(ccService.getCreditCardById(id));
    }

    @Operation(summary = "Obtener las tarjetas de crétido de un usaurio")
    @GetMapping("/personal/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<CreditCardDTO>> getCCByUser(@PathVariable Integer userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(ccService.getCardsByUser(userId));
    }

    @Operation(summary = "Modificar el alias de una tarjeta de crédito")
    @PatchMapping("/alias/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity modifyAliasCC(@PathVariable Integer id, @RequestParam String alias) throws ResourceNotFoundException {
        ccService.updateAliasCreditCard(id, alias);
        return ResponseEntity.ok().build();
    }


    @Operation(summary = "Borrar una tarjeta de crédito por id")
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity deleteCC(@PathVariable Integer id) throws ResourceNotFoundException {
        ccService.deleteCreditCard(id);
        return ResponseEntity.ok().build();
    }






}
