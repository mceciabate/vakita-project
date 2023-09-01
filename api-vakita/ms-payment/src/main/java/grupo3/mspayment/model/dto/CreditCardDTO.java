package grupo3.mspayment.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CreditCardDTO {

    private String creditCardId;
    private Long userId;
    private String alias;
    private String cardNumber;
    private LocalDate expirationDate;
    private String cvv;

    public CreditCardDTO(Long userId, String alias, String cardNumber, LocalDate expirationDate, String cvv) {
        this.userId = userId;
        this.alias = alias;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }
}
