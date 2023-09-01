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
    private Long creditCardId;
    private Long userId;
    private String alias;
    private String cardNumber;
    private LocalDate expirationDate;
    private String cvv;


}
