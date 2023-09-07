import React, { useEffect, useState } from 'react';
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
import Axios from 'axios';
import Swal from 'sweetalert2';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  alias: Yup.string().required('Campo requerido'),
  number: Yup.string()
    // .matches(/^\d{1,16}$/, 'Invalid card number')
    .required('Campo requerido'),
  expiry: Yup.string()
    .matches(/^\d{2}\/\d{2}$/, 'Invalid expiry date')
    .required('Campo requerido'),
  cvc: Yup.string()
    .matches(/^\d{3}$/, 'Invalid CVC')
    .required('Campo requerido'),
});

function PaymentForm({ paymentDetails }) {
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(false);


  const userId= localStorage.getItem("userId")
  const token = JSON.parse(localStorage.getItem("token"));

  const formatExpirationDate = (expiry) => {

    const [month, year] = expiry.split('/');
  
 
    const formattedDate = `20${year}-${month}-01`;
  
    return formattedDate;
  };

  const formatDateForDisplay = (date) => {
    const parts = date.split('-');
    const month = parts[1];
    const year = parts[0].slice(-2);
    return `${month}/${year}`;
  };

useEffect(() => {
    fetchSavedCardData(); 
  }, []);


  const fetchSavedCardData = async () => {
    try {
      setLoading(true); 
  
      const response = await Axios.get(
        `http://107.22.65.36:8080/api/v1/payment/personal/${userId}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setLoading(false); 
  
      if (response.status === 200) {
        // console.log(response.data);
        const formattedData = response.data.map((card) => ({
          alias: card.alias,
          cardNumber: card.cardNumber.slice(-4),
          expirationDate: formatDateForDisplay(card.expirationDate),
          cvc: '***',
          creditCardId: card.creditCardId,
        }));
        setSavedCards(formattedData);
      } else {
        console.error('Failed to fetch saved card data');
      }
      
    } catch (error) {
      setLoading(false); 
      console.error('An error occurred while fetching saved card data', error);
    }
  };

  
 
  const formik = useFormik({
    initialValues: paymentDetails,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.number) {
        const cardData = {
          userId: userId,
          alias: values.alias,
          cardNumber: values.number, 
          expirationDate: formatExpirationDate(values.expiry), 
          cvv: values.cvc,
        };
       
    
        try {
       
          const response = await Axios.post(
            'http://107.22.65.36:8080/api/v1/payment',
            cardData,
            {
              headers: {
                "Content-type": "application/json",   
                Authorization: `Bearer ${token}`,
                     },
            }
          );
    
          if (response.status === 200) {
          
            console.log('Card data saved successfully');
            fetchSavedCardData();

            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: 'La tarjeta se ha guardado correctamente.',
            });
          } else {
            
            console.error('Failed to save card data');
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la tarjeta. Por favor, inténtalo de nuevo.',
            });
           
          }
          
        } catch (error) {
      
          console.error('An error occurred while sending the request', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.',
          });
        }
    
      
        formik.resetForm();
      }
    },
    
  });


  const deleteCard = async (creditCardId) => {
    try {
      const response = await Axios.delete(
        `http://107.22.65.36:8080/api/v1/payment/${creditCardId}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Card data deleted successfully');
      
        const updatedCards = savedCards.filter((card) => card.creditCardId !== creditCardId);
        setSavedCards(updatedCards);
        fetchSavedCardData();

        
      } else {
        console.error('Failed to delete card data');
        
      }
    } catch (error) {
      console.error('An error occurred while sending the request', error);
    }
  };

  const handleDeleteCard = (creditCardId) => {
    deleteCard(creditCardId);
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
        <h2 className="titulo-AppPayment">Introduce tus datos de pago</h2>
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
                  <small>Alias:</small>
                  <input
                    type="text"
                    name="alias"
                    className="form-control"
                    placeholder="Ej: Banco Provincia"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={formik.handleBlur}
                    value={formik.values.alias}
                  />
                  {formik.touched.alias && formik.errors.alias && (
                    <span className="errorCreditCard">{formik.errors.alias}</span>
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
        {loading ? (
  <p>Cargando...</p>
) : (
        <div className="saved-cardGeneral">
          <SavedCardsTable savedCards={savedCards} onDeleteCard={handleDeleteCard} />
        </div>
        )}
      </div>
    </div>
  );
}

export default PaymentForm;





