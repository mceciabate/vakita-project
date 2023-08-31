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

  const handlePaymentDetailsChange = (updatedDetails) => {
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedDetails,
    }));
  };

  return (
    <div className='boxCreditCard'>
      <PaymentForm
        paymentDetails={paymentDetails}
        onPaymentDetailsChange={handlePaymentDetailsChange}
      />
    </div>
  );
}

export default PaymentApp;

