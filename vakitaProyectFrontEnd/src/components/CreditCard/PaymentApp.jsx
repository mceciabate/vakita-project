import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import "../../styles/cardCredit.css";

function PaymentApp() {
  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  });

 

  return (
    <div className='boxCreditCard'>
      <PaymentForm
        paymentDetails={paymentDetails}
    
      />
    </div>
  );
}

export default PaymentApp;

