import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Swal from "sweetalert2";
import { useUser } from '../../context/UserProvider';
import { ContainerGeneral, FormContainer, ContainerInput, Input, Label, BoxText, Button, Questions, FinalParagraph, GeneralFormContainer, ButtonRegister } from './Login.styled.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




function Login() {
  

    const { loginData,  setLogged } = useUser();

    const navigate = useNavigate();

   
          
  
    
    const formik = useFormik({

        initialValues: {
            email: loginData.email,
            password: loginData.password
        },
        validationSchema: Yup.object({
            email: Yup.string().email("No es un email valido").required("Email es requerido"),
            password: Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Contraseña es requerida")
        }),
        onSubmit: async (values) => {
          
            axios.post(
                "http://107.22.65.36:8080/api/v1/usuarios/token",
                {
                  email: values.email,
                  password: values.password,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                     
                  },
                }
              )
              .then((res) => {
           
                if (res.status === 201) {
                  const token = JSON.stringify(res.data.token)
                  localStorage.setItem('token',token);
                  const userId = JSON.stringify(res.data.userId)
                  localStorage.setItem('userId',userId);
                 
              
               
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Inicio exitoso',
                    text: 'Inició tu sesión'
                  })

               

                   setLogged(true); 
                   navigate('/dashboard');

                



                } else if (res.status === 400) {
                  console.log("respuesta1 ", res.data.data);
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'Credenciales incorrectas',
                        icon: 'error'
                    })

                }
              })
              .catch((error) =>
             

                    Swal.fire({
                                        title: 'Error',
                                        text: 'Hubo un problema al intentar iniciar sesión',
                                        icon: 'error'
                                    })
                    
              );
        }
    });

     


    return (

        <ContainerGeneral>

            <GeneralFormContainer>


                <FormContainer onSubmit={formik.handleSubmit}>

                    <BoxText>
                        <h4 className='titulo-card'>VAKITA</h4>
                        <h2 className='titulo-card'>Inicio de sesión</h2>
                    </BoxText>

                    <ContainerInput>
                        <Label htmlFor="Email" className='input-email'>Ingresa tu Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <span style={{ color: "red", marginLeft: "87px" }}>{formik.errors.email}</span>}

                    </ContainerInput>

                    <ContainerInput>
                        <Label htmlFor="Contraseña" className='input-contraseña'>Ingresa tu contraseña</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && <span style={{ color: "red", marginLeft: "87px" }}>{formik.errors.password}</span>}
                    </ContainerInput>

                    <Button className="continuar" type='submit'>Continuar </Button>

                    <Questions>
                        <h5 className='preguntas'>¿Olvidaste tu email?</h5>
                        <h5 className='preguntas'>¿Olvidaste tu contraseña?</h5>
                    </Questions>

                </FormContainer>

                <FinalParagraph>
                    <h5>¿No tienes una cuenta?, <ButtonRegister >Creala aquí</ButtonRegister>  </h5>

                </FinalParagraph>




            </GeneralFormContainer>
        </ContainerGeneral>

    );
}

export default Login;