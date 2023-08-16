
import { Formik, Form, Field, ErrorMessage, FieldArray  } from 'formik';
import * as Yup from 'yup';
import vakitabanner from "../../assets/vakitabanner.png"
import { useContext,  useEffect,  useState } from 'react';
import "../../styles/newVakitaPage.css"
import EmailList from './EmailList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import Swal from 'sweetalert2'
import ShareButton from './SharedButton';
import { VakitaContext } from '../../context/VakitaProvider';
import axiosVakita from "../../helper/axiosVakita"
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';



const NewVakita = () => {
 
  
  const {addNewVakita} = useContext(VakitaContext)
  
  const [emails, setEmails] = useState([]);
  const [emailExists, setEmailExists] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [getUsers, setGetUsers] = useState([]);
  const [arrayMembers, setArrayMembers] = useState([]);

  
  
  useEffect(() => {
    const loadData = async () => {
      await axios.get("http://localhost:8080/api/v1/usuarios").then((res) => {
        
        setGetUsers(res.data)
      });
    };
    loadData();
  }, []);
  



  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    amount: Yup.number().required('Campo requerido'),
    startDate: Yup.string().required('Campo requerido'),
    endDate: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    cumulativeAmount:Yup.number(),
    email: Yup.string()
    .email('Ingrese un email válido')
    .required('Campo requerido'),
  

  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, actions) => {
    // Acá se puede realizar las acciones necesarias con los datos ingresados
    // Por ejemplo, enviar los datos a una API o guardarlos en una base de datos
    // console.log(values);

 
    
   

  console.log(arrayMembers);
    const dataToSend = {
      name:values.name,
      idCreatorUser: 8,
      description:values.description,
      imgURL: "url",
      totalAmount:values.amount,
      creationDate: values.startDate,
      expirationDate: values.endDate,
      cumulativeAmount:values.cumulativeAmount,
      isActive: true,
      type: "normal",
      // contributors: emails.filter((email) => email !== ''), // Filtrar emails vacíos
      contributors: arrayMembers,
    };
    console.log(dataToSend);
    addNewVakita(dataToSend);


     // Validar todos los emails antes de guardarlos solo si no hay emails vacíos
     const allEmailsValid = emails.every((email) => email !== '' && checkEmail(email).exists);

     if (allEmailsValid) {
       // Mostrar los emails por consola
      //  console.log('Array de emails:', emails);
     }
 
     actions.setSubmitting(false);

     
   
     
   
     

    axiosVakita
      .post(
        "",
     dataToSend,
        {
          headers: {
            "Content-type": "application/json",          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
         
          Swal.fire({
            title: '<strong>Vaquita creada con éxito</strong>',
            icon: 'success',
            html:
              'Ir a ' +
              `<a href="/dashboard/mis-vaquitas">Mis Vaquitas</a> ` ,
            showCloseButton: true, 
          })

          actions.resetForm();

      } else if (res.status === 503) {
          console.log("respuesta1 ", res.data.data);
      }
      })
      .catch(error => console.log(error) )
  };







  const handleAddEmail = (values) => {
    


    const emailData = checkEmail(values.email);

    if (values.email.trim() === '') {
      // Ignorar emails vacíos 
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
        setEmails((prevEmails) => [...prevEmails, values.email]);

         // Find the user with the matching email from getUsers
        const userWithEmail = getUsers.find(user => user.email === values.email);
      
      if (userWithEmail) {
        const newMember = {
          id: userWithEmail.id,
          email: userWithEmail.email,
        };
        setArrayMembers(prevArrayMembers => [...prevArrayMembers, newMember]);
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
      <div className="boxItems">
        <div className='title'>
    <h2>Hagamos una vaquita</h2>
    </div>

    <div> 
      

      <Formik
        initialValues={{
          name: '',
          amount: '',
          startDate: '',
          endDate: '',
          description: '',
          cumulativeAmount:'',
          email:'',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

{({values}) => (
        <Form className='formNewVakita'>
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
          

         
            <Field  id="startDate"  name="startDate" label="Fecha inicio de ahorro" component={CustomDatePicker}/>
            
       
            <Field  id="endDate" name="endDate" label="Fecha final de ahorro" component={CustomDatePicker}/>
           

          <div className="boxItems">
            <label htmlFor="description"></label>
            <Field as="textarea" id="description" name="description" placeholder="Descripción" />
            <div className='error'>
            <ErrorMessage name="description" component="div" />
            </div>
          </div>

          <div className="boxItems">
            <label htmlFor="cumulativeAmount"></label>
            <Field type="number" id="cumulativeAmount" name="cumulativeAmount" placeholder="Importe a cargar en la vakita" />
            <div className='error'>
            <ErrorMessage name="cumulativeAmount" component="div" />
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

<div >
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
      <p>{emailValid ? 'Ingrese un email válido.' : 'El email no está registrado.'}</p>
    )}
    {emailExists && isDuplicate && <p>El email está duplicado.</p>}
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
 
          <button className={!emailValid || !emailExists || !values.name || !values.amount || !values.endDate ||  !values.startDate|| !values.description || !values.name || !values.amount ||  !values.description?"buttonSubmit":"buttonSubmitActive"}  type="submit"  disabled={!emailValid || !emailExists || !values.name || !values.amount || !values.endDate ||  !values.startDate|| !values.description || !values.name || !values.amount || !values.description}>Crear Vaca</button>
         
          
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