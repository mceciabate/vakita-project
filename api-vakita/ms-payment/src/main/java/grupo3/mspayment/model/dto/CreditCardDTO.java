package grupo3.mspayment.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditCardDTO {

    private Long creditCardId;
    private Long userId;
    private String alias;
    private String cardNumber;
    private LocalDate expirationDate;
    private String cvv;
}
