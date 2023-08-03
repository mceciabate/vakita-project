
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import vakitabanner from "../../assets/vakitabanner.png"
import { useEffect, useState } from 'react';

const NewVakita = () => {
  const [nameValue, setNameValue] = useState('');
  const [amountValue, setAmountValue] = useState('');





  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    amount: Yup.number().required('Campo requerido'),
    date: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values) => {
    // Aquí puedes realizar las acciones necesarias con los datos ingresados
    // Por ejemplo, enviar los datos a una API o guardarlos en una base de datos
    console.log(values);
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
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

{({ values }) => (
        <Form>
          <div>
            <label htmlFor="name">Nombre de tu vaquita:</label>
            <Field type="text" id="name" name="name" />
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
        <img src={vakitabanner} alt="Imgen de banner"/>
      </div>
      <div>
        <p>{values.name}</p>
        <p>{values.amount}</p>
      </div>
          <button type="submit">Crear Vaca</button>
        </Form>
         )}
      </Formik>
    </div>
    
    
    
    
    
    
    </>
    
    )
}

export default NewVakita