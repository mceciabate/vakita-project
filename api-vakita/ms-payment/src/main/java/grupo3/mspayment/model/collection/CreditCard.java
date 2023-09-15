package grupo3.mspayment.model.collection;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "credit_cards")
public class CreditCard {

    @Transient
    public static final String SEQUENCE_NAME = "cc_sequence";

    @Id
    private int creditCardId;
    private Integer userId;
    private String alias;
    private String cardNumber;
    private LocalDate expirationDate;
    private String cvv;

    public CreditCard(Integer userId, String alias, String cardNumber, LocalDate expirationDate, String cvv) {
        this.userId = userId;
        this.alias = alias;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }
}
