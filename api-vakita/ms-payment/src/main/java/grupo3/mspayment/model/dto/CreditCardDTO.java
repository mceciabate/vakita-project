package grupo3.mspayment.model.dto;


import io.swagger.v3.oas.annotations.Hidden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardDTO {


    @Hidden
    private int creditCardId;
    private Integer userId;
    private String alias;
    private String cardNumber;
    private LocalDate expirationDate;
    private String cvv;

    public CreditCardDTO(Integer userId, String alias, String cardNumber, LocalDate expirationDate, String cvv) {
        this.userId = userId;
        this.alias = alias;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }
}
