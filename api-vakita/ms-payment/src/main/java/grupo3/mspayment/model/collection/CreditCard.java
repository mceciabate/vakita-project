package grupo3.mspayment.model.collection;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "credit_cards")
public class CreditCard implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    private String creditCardId;
    private Long userId;
    private String alias;
    private String cardNumber;
    private LocalDate expirationDate;
    private String cvv;

    public CreditCard(Long userId, String alias, String cardNumber, LocalDate expirationDate, String cvv) {
        this.userId = userId;
        this.alias = alias;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }
}
