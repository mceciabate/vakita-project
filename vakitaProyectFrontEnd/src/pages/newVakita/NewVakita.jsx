
import { Formik, Form, Field, ErrorMessage, FieldArray  } from 'formik';
import * as Yup from 'yup';
import vakitabanner from "../../assets/vakitabanner.png"
import {  useState } from 'react';
import "../../styles/newVakitaPage.css"
import EmailList from './EmailList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleInfo, faShareNodes } from "@fortawesome/free-solid-svg-icons"
import Swal from 'sweetalert2'
import ShareButton from './SharedButton';


const NewVakita = () => {
 
  
  
  
  const [emails, setEmails] = useState([]);
  const [emailExists, setEmailExists] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [emailValid, setEmailValid] = useState(true);


  
  
  
  



  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    amount: Yup.number().required('Campo requerido'),
    date: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    email: Yup.string()
    .email('Ingrese un email válido')
    .required('Campo requerido'),
  

  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, actions) => {
    // Acá se puede realizar las acciones necesarias con los datos ingresados
    // Por ejemplo, enviar los datos a una API o guardarlos en una base de datos
    console.log(values);

    const dataToSend = {
      name:values.name,
      amount:values.amount,
      date: values.date,
      description:values.description,
      emails: emails.filter((email) => email !== ''), // Filtrar emails vacíos
    };
    console.log(dataToSend);


     // Validar todos los emails antes de guardarlos solo si no hay emails vacíos
     const allEmailsValid = emails.every((email) => email !== '' && checkEmail(email).exists);

     if (allEmailsValid) {
       // Mostrar los emails por consola
       console.log('Array de emails:', emails);
     }
 
     actions.setSubmitting(false);

     
     Swal.fire({
      title: '<strong>Vaquita creada con éxito</strong>',
      icon: 'success',
      html:
        'Ir a ' +
        '<a href="//sweetalert2.github.io">Mis Vaquitas</a> ' ,
      showCloseButton: true,
      
      
    })
     
    actions.resetForm();
     
  };


    





  const handleAddEmail = (values, actions) => {
    const emailData = checkEmail(values.email);

    if (values.email.trim() === '') {
      // Ignorar emails vacíos
      return;
    }

    if (!emailData.exists) {
      //cambie EmailValid a false, estaba en true, probar con API
      setEmailValid(false);
      setEmailExists(false);
      setIsDuplicate(false);
      setEmails((prevEmails) => [...prevEmails, values.email]);
    } else if (emailData.isDuplicate) {
      setIsDuplicate(true);
      setEmailExists(true);
    } else {
      //cambie EmailValid a false, estaba en true, probar con API
      setEmailValid(false);
      setEmailExists(true);
      setIsDuplicate(false);

      // Verificar si el email ya está en el array antes de agregarlo
      if (!emails.includes(values.email)) {
        setEmails((prevEmails) => [...prevEmails, values.email]);
      }
    }
  };

  const checkEmail = (email) => {
    // Simulación de la verificación en el array de emails
    const emailExists = emails.includes(email);
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
      <div className="boxItems">
        <div className='title'>
    <h2>Hagamos una vaquita</h2>
    </div>

    <div> 
      

      <Formik
        initialValues={{
          name: '',
          amount: '',
          date: '',
          description: '',
          email:'',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

{({values}) => (
        <Form>
          <div className='boxReverseBanner'>
            <div className='boxOne'>
          <div className="boxItems">
            <label htmlFor="name"></label>
            <Field type="text" id="name" name="name" placeholder="Nombre de la vaca"/>
            <div className='error'>
            <ErrorMessage name="name" component="div" />
            </div>
          </div>
          <div className="boxItems">
            <label htmlFor="amount"></label>
            <Field type="number" id="amount" name="amount" placeholder="Importe total" />
            <div className='error'>
            <ErrorMessage name="amount" component="div" />
            </div>
          </div>
          <div className="boxItems">
            <label htmlFor="date"></label>
            <Field type="date" id="date" name="date"/>
            <div className='error'>
            <ErrorMessage name="date" component="div" />
            </div>
          </div>
          <div className="boxItems">
            <label htmlFor="description"></label>
            <Field as="textarea" id="description" name="description" placeholder="Descripción" />
            <div className='error'>
            <ErrorMessage name="description" component="div" />
            </div>
          </div>

          </div>

          <div className='boxTwo'>
          <div className='img'>
        <img src={vakitabanner} alt="Imagen de banner"/>
      </div>
      <div>
        <p className={values.name ?"textBannerActive": 'textBanner'}>{values.name|| "Nombre de la vaca"}</p>
        <p className= {values.amount ?"textBannerActiveNumber": 'textBanner'}>{values.amount ? `$ ${values.amount}`: "$0 "}</p>
        
      </div>
      </div>

      </div>


      <div className='halfBackground'>

<div>
<div className="boxItems">

          <EmailList emails={emails} onRemove={removeMember} />

        <div>
        <div className="boxItems">
              <label htmlFor="email"></label>
              <Field type="email" id="email" name="email" placeholder="Agregar integrante con su email" />
              <div className='error'>
              <ErrorMessage name="email" component="div" />
              </div>
              </div>
              {emailExists !== null && (
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
      )}
      
            </div>
            <div>
              <button type="button" disabled={!values.email.includes('@')} className="buttonAdd" onClick={() => handleAddEmail(values)}>
              <FontAwesomeIcon icon={faCirclePlus}  />
              </button>
              
            </div>
          
            </div>



    


          </div>
          
      



<div className='buttonSubmitBox'>
   {/* Revisar validacion de className cuando este conectado al back*/}
          <button className={emailValid || !values.name || !values.amount || !values.date || !values.description || !values.name || !values.amount || !values.date || !values.description?"buttonSubmit":"buttonSubmitActive"}  type="submit"  disabled={emailValid|| !values.name || !values.amount || !values.date || !values.description || !values.name || !values.amount || !values.date || !values.description}>Crear Vaca</button>
         
          
          </div>
          </div>
        </Form>
         )}

         
      </Formik>

      <div className='info'>
        
        <div className='infoText'>

        <FontAwesomeIcon icon={faCircleInfo} size="xl" />
        <p>Recuerda que todos los integrantes de este grupo
         tienen que estar registrados en nuestra plataforma.
        </p>
        <div ><ShareButton url={"https://fontawesome.com/docs/web/use-with/react/style#size"} /></div>
        </div>
        
        
        </div>


    </div>
    
    
    
    
    </div>

    </div>
    </>
    
    )
}

export default NewVakita