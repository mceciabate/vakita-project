import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logoVaca from "../../assets/logoVacaInicio.png";
import Swal from "sweetalert2";
import { useUser } from '../../context/UserProvider';
import { ContainerGeneral, FormContainer, ContainerInput, Input, Label, BoxText, Button, Questions, TituloBienvenida, FinalParagraph, GeneralFormContainer, ButtonRegister, Compania,ImgVaca } from './Login.styled.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Login() {
  
  const [listUsers, setListUsers]=useState([])
    const { loginData, setUserId, setLogged } = useUser();

    const navigate = useNavigate();


   useEffect(() => {
        const loadData = async () => {
          await axios.get("http://107.22.65.36:8080/api/v1/usuarios").then((res) => {
           
        setListUsers(res.data)
          });
        };
        loadData();
      }, []);

    //   const matchingUser = listUsers.find(user => user.email === userEmail);

    //   if (matchingUser) {
    //       const userId = matchingUser.id;
    //       setUserId(userId); 
        
    //   }
    
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
                  const token = JSON.stringify(res.data)
                  localStorage.setItem('token',token);
             
           
                  Swal.fire({
                            title: 'Inicio exitoso',
                            text: 'Inició tu sesión',
                            icon: 'success'
                        });

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

            
         
         <ImgVaca src={logoVaca} alt="logo" /> 



            <GeneralFormContainer>

                <TituloBienvenida>
                    <h1>Bienvenido a su vaca virtual</h1>
                </TituloBienvenida>


                <FormContainer onSubmit={formik.handleSubmit}>

                    <BoxText>
                        <h2>Inicio de sesión</h2>
                    </BoxText>

                    <ContainerInput>
                        <Label htmlFor="Email">Ingresa tu Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <span style={{ color: "red", marginLeft: "20px" }}>{formik.errors.email}</span>}

                    </ContainerInput>

                    <ContainerInput>
                        <Label htmlFor="Contraseña">Ingresa tu contraseña</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && <span style={{ color: "red", marginLeft: "20px" }}>{formik.errors.password}</span>}
                    </ContainerInput>

                    <Button className="continuar" type='submit'>Continuar </Button>

                    <Questions>
                        <h5>¿Olvidaste tu email?</h5>
                        <h5>¿Olvidaste tu contraseña?</h5>
                    </Questions>

                </FormContainer>

                <FinalParagraph>
                    <h5>¿No tienes una cuenta?, <ButtonRegister >Creala aquí</ButtonRegister>  </h5>

                </FinalParagraph>

                <Compania>
                    Cow company <br /> De colombia y argentina pal mundo
                </Compania>


            </GeneralFormContainer>
        </ContainerGeneral>

    );
}

export default Login;