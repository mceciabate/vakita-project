import React, { useState } from 'react';
import Card from 'react-credit-cards-2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDateInput,
} from './utils';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../../styles/cardCredit.css';
import SavedCardsTable from './SavedCardsList';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string()
    // .matches(/^\d{1,16}$/, 'Invalid card number')
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(/^\d{2}\/\d{2}$/, 'Invalid expiry date')
    .required('Expiry date is required'),
  cvc: Yup.string()
    .matches(/^\d{3}$/, 'Invalid CVC')
    .required('CVC is required'),
});

function PaymentForm({ paymentDetails, onPaymentDetailsChange }) {
  const [savedCards, setSavedCards] = useState([]);



  const formik = useFormik({
    initialValues: paymentDetails,
    validationSchema: validationSchema,
    onSubmit: values => {
        if (values.number) {
            const lastFourDigits = values.number.slice(-4); 
            const cardData = {
              name: values.name,
              number: lastFourDigits, 
              expiry: values.expiry,
              cvc: values.cvc,
            };
            setSavedCards([...savedCards, cardData]);
            onPaymentDetailsChange({
              number: '',
              name: '',
              expiry: '',
              cvc: '',
              focused: '',
            });
            formik.resetForm();
          }
    },
  });

  const handleDeleteCard = index => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    setSavedCards(updatedCards);
  };

  const handleInputFocus = ({ target }) => {
    formik.setFieldValue('focused', target.name);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    let formattedValue = value;
    if (name === 'number') {
      formattedValue = formatCreditCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpirationDateInput(value);
    } else if (name === 'cvc') {
      formattedValue = formatCVC(value);
    }

    formik.setFieldValue(name, formattedValue);
  };

  return (
    <div key="Payment" className='generalCointainer'>
      <div className="App-payment">
        <h2>Introduce tus datos de pago</h2>
        <div className='boxCard'>
          <Card
            number={formik.values.number}
            name={formik.values.name}
            expiry={formik.values.expiry}
            cvc={formik.values.cvc}
            focused={formik.values.focused}
          />
        </div>
        <form className="formCardCredit" onSubmit={formik.handleSubmit}>
          <div className='dataCardCredit'>
            <div className="column-container">
              <div className="form-group">
                <div className='boxInput'>
                  <div>
                    <small>Nombre de tarjeta:</small>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder=""
                      required
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <span className="errorCreditCard">{formik.errors.name}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className='boxInput'>
                  <small>Numero de tarjeta:</small>
                  <input
                    type="tel"
                    name="number"
                    className="form-control"
                    placeholder=""
                    pattern="[0-9 ]{16,22}"
                    maxLength="19"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={formik.handleBlur}
                    value={formik.values.number}
                  />
                  {formik.touched.number && formik.errors.number && (
                    <span className="errorCreditCard">{formik.errors.number}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="column-container">
              <div className="form-group">
                <div className='boxInput'>
                  <small>Vencimiento:</small>
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder=""
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={formik.handleBlur}
                    value={formik.values.expiry}
                  />
                  {formik.touched.expiry && formik.errors.expiry && (
                    <span className="errorCreditCard">{formik.errors.expiry}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className='boxInput'>
                  <div>
                    <small>CVC:</small>
                  </div>
                  <input
                    type="password"
                    name="cvc"
                    className="form-control"
                    placeholder=""
                    pattern="\d{3}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={formik.handleBlur}
                    value={formik.values.cvc}
                  />
                  {formik.touched.cvc && formik.errors.cvc && (
                    <span className="errorCreditCard">{formik.errors.cvc}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="buttonCardCredit">
            <button type="submit">Guardar</button>
          </div>
        </form>

        <div className="saved-cardGeneral">
          <SavedCardsTable savedCards={savedCards} onDeleteCard={handleDeleteCard} />
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;





