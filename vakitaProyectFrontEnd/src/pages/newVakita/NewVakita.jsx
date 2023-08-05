
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import vakitabanner from "../../assets/vakitabanner.png"
import { useState } from 'react';
import "../../styles/newVakitaPage.css"


const NewVakita = () => {
 
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  
  


console.log(emailValue);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    amount: Yup.number().required('Campo requerido'),
    date: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    email: Yup.string().email('Email inválido').required('Campo requerido'),
  //  email: Yup.string().required('Campo requerido')
  //  .test('email-exists', 'Email no existe', async function (value) {
  //   try {
  //     const response = await fetch(`https://tu-api.com/verificar-email?email=${value}`);
  //     const data = await response.json();
  //     return data.exists; // Aquí asumimos que la API devuelve un objeto { exists: true/false }
  //   } catch (error) {
  //     console.error('Error al verificar el email en la API:', error);
  //     return false;
  //   }
  // }),

  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values) => {
    // Aquí puedes realizar las acciones necesarias con los datos ingresados
    // Por ejemplo, enviar los datos a una API o guardarlos en una base de datos
    console.log(values);
  };


    // Función para manejar la verificación de email al hacer clic en "Add"
    const handleAddClick = async (values) => {
      setEmailValue(values)

      try {
        await validationSchema.validateAt('email', { email: emailValue });
        // Llamar a la API aquí para verificar la existencia del email
        console.log('Email válido:', emailValue);
        setEmailError('');
      } catch (error) {
        console.error('Error de validación del email:', error.message);
        setEmailError('Ingrese un email de usuario válido');
      }
    };
 
  return (
    <>
    <h2>Hagamos una vaquita</h2>

    <div> 
      

      <Formik
        initialValues={{
          name: '',
          amount: '',
          date: '',
          description: '',
          email: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

{({values}) => (
        <Form>
          <div>
          <div>
            <label htmlFor="name">Nombre de tu vaquita:</label>
            <Field type="text" id="name" name="name"/>
            <ErrorMessage name="name" component="div" />
           
          </div>
          <div>
            <label htmlFor="amount">Importe total:</label>
            <Field type="number" id="amount" name="amount" />
            <ErrorMessage name="amount" component="div" />
          </div>
          <div>
            <label htmlFor="date">Plazo de la vaquita:</label>
            <Field type="date" id="date" name="date" />
            <ErrorMessage name="date" component="div" />
          </div>
          <div>
            <label htmlFor="description">Descripción:</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>

          <div>
        <img src={vakitabanner} alt="Imagen de banner"/>
      </div>
      <div>
        <p>{values.name}</p>
        <p>{values.amount}</p>
      </div>
      </div>

      </div>


      <div>
<h4>¿Quiénes van a ser los integrantes de esta vaca?</h4>
<div>
            <label htmlFor="email"></label>
            <Field type="email" id="email" name="email"   placeholder="Agregar integrante con su email"/>
            <ErrorMessage name="email" component="div" />
            {emailError && <div>{emailError}</div>}
           
          </div>
          {/* <button type="button" onClick={() => setEmailValue(values.email)}>Add</button> */}
          <button type="button" onClick={() => handleAddClick(values.email)}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></button>
      </div>


          <button className="buttonSubmit" type="submit"  disabled={!emailValue || emailError}>Crear Vaca</button>
        </Form>
         )}
      </Formik>
    </div>
    
    
    
    
    
    
    </>
    
    )
}

export default NewVakita