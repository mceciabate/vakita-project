package grupo3.mspayment.repository;


import grupo3.mspayment.model.collection.CreditCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICreditCardMongoRepository extends MongoRepository<CreditCard, Long> {
}
