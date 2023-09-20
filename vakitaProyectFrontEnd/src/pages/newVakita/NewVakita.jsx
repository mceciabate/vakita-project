import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import { useContext, useEffect, useState } from 'react';
import "../../styles/newVakitaPage.css"
import EmailList from './EmailList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import ShareButton from './SharedButton';
import axiosVakita from "../../helper/axiosVakita"
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';
import Swal from 'sweetalert2'




const NewVakita = () => {

  const [cardAliases, setCardAliases] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [emails, setEmails] = useState([]);
  const [emailExists, setEmailExists] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [getUsers, setGetUsers] = useState([]);
  const [arrayMembers, setArrayMembers] = useState([]);


  const userId = localStorage.getItem("userId")
  const emailUser=localStorage.getItem("emailUser")
  const token = JSON.parse(localStorage.getItem('token'));
 


  useEffect(() => {
    if (userId !== null) {
      const loadCardAliases = async () => {
        try {
          const response = await axios.get(`http://107.22.65.36:8080/api/v1/payment/personal/${userId}`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const aliases = response.data.map((card) => card.alias);
         
          setCardAliases(aliases);
        } catch (error) {
          console.error('Error fetching card aliases:', error);
        }
      };
      loadCardAliases();
    }
  }, [userId, token]);

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

 


  useEffect(() => {
    const loadData = async () => {
      await axios.get("http://107.22.65.36:8080/api/v1/usuarios").then((res) => {

        setGetUsers(res.data)

      });
    };
    loadData();
  }, []);




  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    amount: Yup.number()
      .required('Campo requerido')
      .min(1, 'El importe debe ser mayor que 0'),
    startDate: Yup.string().required('Campo requerido'),
    endDate: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    cumulativeAmount: Yup.number()
    .min(0, 'El importe debe ser mayor o igual a 0').required('Campo requerido'), // Cambiado de min(1) a min(0),
    email: Yup.string()
    .email('Ingrese un email válido')
    .test('is-email-required', 'Debes agregar al menos 1 integrante', function (value) {
      // La validación personalizada verifica si el campo de correo electrónico está vacío
      // Si está vacío y no hay ningún correo electrónico en la lista 'emails', muestra el mensaje de error
      return value || emails.length > 0;
    })
     ,


  });

  validationSchema.test('hasMembers', 'Debes agregar al menos 1 integrante', function (value) {
    return emails.length > 0;
  });
  
  // Función para limpiar los valores del formulario cuando se hunda el boton crear vaka
  const resetFormValues = (actions) => {
    actions.resetForm({
      name: '',
      amount: '',
      startDate: '',
      endDate: '',
      description: '',
      cumulativeAmount: '',
      email: '',
    });
    setEmails([]); // Limpiar la lista de emails
    setArrayMembers([]); // Limpiar la lista de miembros
  };

  
  // Función para manejar el envío del formulario
  const handleSubmit = (values, actions) => {
    // Acá se puede realizar las acciones necesarias con los datos ingresados
    // Por ejemplo, enviar los datos a una API o guardarlos en una base de datos
    // console.log(values);

    // console.log(arrayMembers);
    const dataToSend = {
      name: values.name,
      idCreatorUser: userId,
      description: values.description,
      imgURL: "url",
      totalAmount: values.amount,
      creationDate: values.startDate,
      expirationDate: values.endDate,
      cumulativeAmount: values.cumulativeAmount,
      isActive: true,
      type: "normal",

      contributors: arrayMembers,


    };

    
    

    actions.setSubmitting(false);






    const token = JSON.parse(localStorage.getItem("token"));
    axiosVakita
      .post(
        "",
        dataToSend,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {

          Swal.fire({
            title: '<strong>Vakita creada con éxito</strong>',
            icon: 'success',
            html:
              'Ir a ' +
              `<a href="/dashboard/mis-vakitas">Mis Vakitas</a> `,
            showCloseButton: true,
          })

          actions.resetForm(); // Restablece el formulario después de enviarlo con éxito
          resetFormValues(actions); // Limpia los campos después de restablecer el formulario

        } else if (res.status === 503) {
          console.log("respuesta1 ", res.data.data);
        }
      })
      .catch(error => console.log(error))

      
  };



  const handleAddEmail = (values) => {
    const emailData = checkEmail(values.email);
  
    if (values.email.trim() === '') {
      return;
    }
  
    if (!emailData.exists) {
      setEmailValid(false);
      setEmailExists(false);
      setIsDuplicate(false);
    } else if (emailData.isDuplicate) {
      setIsDuplicate(true);
      setEmailExists(true);
    } else {
      setEmailValid(true);
      setEmailExists(true);
      setIsDuplicate(false);
  
      if (!emails.includes(values.email)) {
        if (values.email === emailUser) {
         
          return; 
        }
  
        setEmails((prevEmails) => [...prevEmails, values.email]);
  
        const userWithEmail = getUsers.find((user) => user.email === values.email);
  
        if (userWithEmail) {
          const newMember = {
            id: userWithEmail.id,
            email: userWithEmail.email,
          };
          setArrayMembers((prevArrayMembers) => [...prevArrayMembers, newMember]);
        }
      }
    }
  };
  

  const checkEmail = (email) => {

    const emailExists = getUsers.some((user) => user.email === email);
    const isDuplicate = emails.filter((item) => item === email).length > 1;

    return { exists: emailExists, isDuplicate };
  };


  const removeMember = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };





  return (
    <>
      <div className='containerPage'>
        <div className='title'>
          <h2 className='title2'>Hagamos una vakita</h2>
        </div>
        <div className="boxItems">


          <div>


            <Formik
              initialValues={{
                name: '',
                amount: '',
                startDate: '',
                endDate: '',
                description: '',
                cumulativeAmount: '',
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >

              {({ values }) => (
                <Form className='formNewVakita'>
                  <div className='boxReverseBanner'>

                    <div className='boxOne'>
                      <div className="boxItems">
                        <label className='labelDate' htmlFor="name">Nombre de la vaka</label>
                        <Field className="inputText" type="text" id="name" name="name" placeholder="¿Qué nombre le vas a poner a tu vakita?" />
                        <span className='error'>
                          <ErrorMessage className='error-mensaje' name="name" component="span" />
                        </span>

                      </div>
                      <div className="boxItems">
                        <label className='labelDate' htmlFor="amount">Importe total</label>
                        <Field className="inputNumber" type="number" id="amount" name="amount" label="Fecha inicio de ahorro" placeholder="¿Cuánto es el importe que quieres obtener con esta Vakita?" />
                        <div className='error'>
                          <ErrorMessage name="amount" component="div" />
                        </div>
                      </div>



                      <Field className="inputDate" id="startDate" name="startDate" label="Fecha inicio de ahorro" component={CustomDatePicker} />


                      <Field className="inputDate" id="endDate" name="endDate" label="Fecha final de ahorro" component={CustomDatePicker} />


                      <div className="boxItems">
                        <label className='labelDate' htmlFor="description">Descripción</label>
                        <Field type="text" className="inputDescription" id="description" name="description" placeholder="Agrega tu descripción" />
                        <span className='error'>
                          <ErrorMessage name="description" component="div" />
                        </span>
                      </div>

                      <div className="boxItems">
                        <label className='labelDate' htmlFor="cumulativeAmount">Importe a cargar en la vakita</label>
                        <Field className="inputNumber" type="number" id="cumulativeAmount" name="cumulativeAmount" placeholder="Agrega aquí tu importe" />
                        <div className='error'>
                          <ErrorMessage name="cumulativeAmount" component="div" />
                        </div>
                      </div>

                      <div className="boxItems"> 
                        <label className='labelDate' htmlFor="TarjetaSeleccionada">¿Qué tarjeta quieres utilizar para debitar tu aporte?</label>
                        <select
                          className="inputTarjeta"
                          id="TarjetaSeleccionada"
                          name="TarjetaSeleccionada"
                          value={selectedCard}
                          disabled={!values.cumulativeAmount || values.cumulativeAmount <= 0}
                          onChange={handleCardChange}
                        >
                          <option value="">Selecciona una tarjeta</option>
                          {cardAliases.map((alias, index) => (
                            <option value={alias} key={index}>{alias}</option>
                          ))}
                        </select>
                      </div>


                    </div>

                    <div className='boxTwo'>
                      <div className='img'>
                        <img src="https://grupo3-vakita.s3.amazonaws.com/assets/vakitabanner.png" alt="Imagen de banner" />
                      </div>
                      <div>
                        <p className={values.name ? "textBannerActive" : 'textBanner'}>{values.name || "Nombre de la vaka"}</p>
                        <p className={values.amount ? "textBannerActiveNumber" : 'textBanner'}>{values.amount ? `$ ${values.amount}` : "$0 "}</p>

                      </div>
                    </div>

                  </div>


                  <div className='halfBackground'>

                    <div >
                      <div className='membersDesktop'>
                        <div className="boxItems">

                          <EmailList emails={emails} onRemove={removeMember} />

                          <div>
                            <div className="boxItems">
                              <label htmlFor="email"></label>
                              <Field className="inputEmail" type="email" id="email" name="email" placeholder="Agregar email del integrante" />
                              <div className='error'>
                                <ErrorMessage name="email" component="div" />
                              </div>
                            </div>
                            {/* {emailExists !== null && (
        <div>
          {emailExists ? (
            isDuplicate ? (
              <p>El email está duplicado.</p>
            ) : (
              <div>
                <p>El email ya fue agregado: {emails[emails.length - 1]}</p>
              </div>
            )
          ) : emailValid ? (
            <p>Ingrese un email de un usuario válido.</p>
          ) : null}
          
        </div>
      )} */}

{emailExists !== null && (
  <div>
    {!emailExists && (
      <p>
        {emailValid
          ? 'Ingrese un email válido.'
          : 'El email no está registrado.'}
      </p>
    )}
    {emailExists && isDuplicate && <p>El email está duplicado.</p>}
    {emailExists && values.email === emailUser && (
      <p>El email ingresado, se agrega por default.</p>
    )}
  </div>
)}

                          </div>
                          <div>
                            <button type="button" disabled={!values.email.includes('@')} className="buttonAdd" onClick={() => handleAddEmail(values)}>
                              <FontAwesomeIcon icon={faCirclePlus} />
                            </button>

                          </div>

                        </div>
                      </div>





                    </div>





                    <div className='buttonSubmitBox'>

                      <button
                        id="buttonNewVakita"
                        className={
                          !emailValid ||
                            !emailExists ||
                            !values.name ||
                            !values.amount ||
                            !values.endDate ||
                            !values.startDate ||
                            !values.description ||
                            !values.name ||
                            !values.amount ||
                            !values.description ||
                            values.amount <= 0 || // Validación para amount
                            (values.cumulativeAmount && values.cumulativeAmount <= 0) // Validación para cumulativeAmount
                            ? 'buttonSubmit'
                            : 'buttonSubmitActive'
                        }
                        type="submit"
                        disabled={
                          !emailValid ||
                          !emailExists ||
                          !values.name ||
                          !values.amount ||
                          !values.endDate ||
                          !values.startDate ||
                          !values.description ||
                          !values.name ||
                          !values.amount ||
                          !values.description ||
                          values.amount <= 0 || // Validación para amount
                          (values.cumulativeAmount && values.cumulativeAmount <= 0) // Validación para cumulativeAmount
                        }
                      >
                        Crear Vaka
                      </button>


                    </div>
                    <div className='info'>

                      <div className='infoText'>

                        <FontAwesomeIcon icon={faCircleInfo} size="xl" style={{ marginBottom: '20px', marginTop: '-40px', marginLeft: '-18px', color: '#4D7B84' }} />
                        <p>Recuerda que todos los integrantes
                          tienen que estar registrados en nuestra plataforma.
                        </p>
                        <div className='boton-invitar'><ShareButton url={"http://54.221.139.107/"} /></div>
                      </div>


                    </div>
                  </div>
                </Form>
              )}


            </Formik>



          </div>




        </div>

      </div>
    </>

  )
}

export default NewVakita