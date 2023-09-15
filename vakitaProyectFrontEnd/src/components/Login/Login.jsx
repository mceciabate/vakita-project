import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Swal from "sweetalert2";
import { useUser } from '../../context/UserProvider';
import { ContainerGeneral, FormContainer, ContainerInput, Input, Label, BoxText, Button, Questions, FinalParagraph, GeneralFormContainer, ButtonRegister } from './Login.styled.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




function Login() {
    



    const { loginData,  setLogged } = useUser();

    const navigate = useNavigate();

    const handlePasswordChange = () => {
        Swal.fire({
            title: 'Cambiar Contraseña',
            html:
                `<input type="email" id="email" class="swal2-input" placeholder="Email">`,
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const email = Swal.getPopup().querySelector('#email').value;
    
                if (!email) {
                    Swal.showValidationMessage('Por favor, ingresa un correo electrónico válido');
                }
    
                return { email };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { email } = result.value;
               

              
                axios.get(`http://107.22.65.36:8080/api/v1/usuarios/email/${email}`)
                    .then((response) => {
                        const users = response.data;
                        console.log(users.id);
                        console.log(response.status===200);
                      
                        let codeData = "";

                        if(response.status===404){
                              
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un problema al intentar obtener la lista de usuarios',
                        });
                        }
    
                        if (response.status===200) {
                            const userId = users.id;

                            //Post enviar correo al usuario para que obtenga el código
                            axios.post(
                                "http://107.22.65.36:8080/api/v1/usuarios/recover",
                                {
                                    email: email,
                                },
                                {
                                    headers: {
                                        "Content-type": "application/json",
                                        "Accept": "application/json",
                                    },
                                })
                                .then(response => {
                                    codeData = response.data.token;
                                })
                                .catch(error => {
                                    console.error('Error al hacer la solicitud:', error);
                                });
    
                            Swal.fire({
                                title: 'Cambiar Contraseña',
                                html:
                                    `<p>Como medida de seguridad adicional, introduce el código que hemos enviado a su correo.</p>
                                    <input type="password" id="code" class="swal2-input" placeholder="Código">
                                    <input type="password" id="newPassword" class="swal2-input" placeholder="Nueva contraseña">
                                    <input type="password" id="confirmNewPassword" class="swal2-input" placeholder="Confirmar contraseña">`,
                                focusConfirm: false,
                                showCancelButton: true,
                                cancelButtonText: 'Cancelar',
                                preConfirm: () => {
                                    const newPassword = Swal.getPopup().querySelector('#newPassword').value;
                                    const confirmNewPassword = Swal.getPopup().querySelector('#confirmNewPassword').value;
                                    const code = Swal.getPopup().querySelector('#code').value;
    
                                    if (!code || code !== codeData || !newPassword || !confirmNewPassword || newPassword !== confirmNewPassword) {
                                        Swal.showValidationMessage('Por favor, completa los campos y asegúrate de que las contraseñas coincidan y el código sea válido');
                                    }
    
                                    return { userId, newPassword, confirmNewPassword };
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    const { userId, newPassword, confirmNewPassword } = result.value;
    
                                    
                                    axios.patch(
                                        `http://107.22.65.36:8080/api/v1/usuarios/${userId}`,
                                        {
                                            password: newPassword,
                                        },
                                        {
                                            headers: {
                                                "Content-type": "application/json",
                                                "Accept": "application/json",
                                            
                                            },
                                        }
                                    )
                                    .then((response) => {
                                        
                                       
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Contraseña Cambiada',
                                            text: '¡Tu contraseña ha sido cambiada exitosamente!',
                                        });
                                    })
                                    .catch((error) => {
                                     
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'Hubo un problema al intentar cambiar la contraseña',
                                        });
                                    });
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Usuario no encontrado',
                                text: 'No se encontró ningún usuario con el correo electrónico proporcionado',
                            });
                        }
                    })
                    .catch((error) => {
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Usuario no encontrado',
                            text: 'No se encontró ningún usuario con el correo electrónico proporcionado',
                        });
                    });
            }
        });
    };
    
    
    
    
    
    
    
  
    
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
                       
                    <h5 className='preguntas'>
      ¿Olvidaste tu contraseña? <ButtonRegister type="button" onClick={handlePasswordChange} >Click Aquí</ButtonRegister> </h5>
                        <h5 className='preguntas'>¿No tienes una cuenta?  <Link to="/register"> <ButtonRegister type="button"  >Creala aquí</ButtonRegister></Link> </h5>
                    </Questions>

                </FormContainer>

              



            </GeneralFormContainer>
        </ContainerGeneral>

    );
}

export default Login;

